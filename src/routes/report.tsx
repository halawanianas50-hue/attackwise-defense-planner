import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ALL_TECHNIQUES, MITIGATIONS, TACTICS } from "@/lib/attack-data";
import { useStore, useT } from "@/lib/store";
import { coveragePct, levelOf } from "@/lib/scoring";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Executive Report — ATT&CKWISE" },
      { name: "description", content: "Overall defense coverage, tactic breakdown and Word export of your ATT&CK defense plan." },
      { property: "og:title", content: "Executive Report — ATT&CKWISE" },
      { property: "og:description", content: "Overall defense coverage, tactic breakdown and Word export." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

const toneVar = (pct: number) => ({ good: "var(--success)", mid: "var(--warning)", bad: "var(--danger)" })[levelOf(pct)];

function ReportPage() {
  const st = useStore();
  const tr = useT();
  const chartRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const sel = ALL_TECHNIQUES.filter((x) => st.selected.includes(x.id));
  const statuses = sel.map((x) => st.statusOf(x.id));
  const covered = statuses.filter((s) => s === "covered").length;
  const partial = statuses.filter((s) => s === "partial").length;
  const gaps = statuses.filter((s) => s === "gap").length;
  const pct = st.coverage;
  const posture = levelOf(pct) === "good" ? tr("Strong posture", "وضع دفاعي قوي") : levelOf(pct) === "mid" ? tr("Moderate posture", "وضع دفاعي متوسط") : tr("At risk", "وضع دفاعي حرج");

  const tactics = TACTICS.map((tc) => {
    const items = sel.filter((x) => x.tactic.id === tc.id);
    const ss = items.map((x) => st.statusOf(x.id));
    return { name: `${tc.emoji} ${tr(tc.en, tc.ar)}`, plain: tr(tc.en, tc.ar), total: items.length, covered: ss.filter((s) => s === "covered").length, partial: ss.filter((s) => s === "partial").length, gaps: ss.filter((s) => s === "gap").length, pct: coveragePct(ss) };
  }).filter((t) => t.total > 0);

  const label = (s: string) => (s === "covered" ? tr("Defended", "محمي") : s === "partial" ? tr("Partial", "جزئي") : tr("Gap", "ثغرة"));
  const statusTxt = (s?: string) => (s === "full" ? tr("full", "كامل") : s === "partial" ? tr("partial", "جزئي") : tr("not applied", "غير مطبق"));

  async function onExport() {
    setBusy(true);
    try {
      let chart;
      if (chartRef.current) {
        const { default: html2canvas } = await import("html2canvas-pro");
        const canvas = await html2canvas(chartRef.current, { backgroundColor: "#121726", scale: 2 });
        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), "image/png"));
        chart = { data: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height };
      }
      const rows = sel.map((x) => {
        const r = st.ratings[x.id] ?? {};
        const off = x.mitigations.map((m) => `${m} ${tr(MITIGATIONS[m]!.en, MITIGATIONS[m]!.ar)} (${statusTxt(r[m])})`);
        const cus = (st.custom[x.id] ?? []).map((c) => `★ ${c.name} (${statusTxt(c.status)})`);
        return { id: x.id, name: tr(x.en, x.ar), tactic: tr(x.tactic.en, x.tactic.ar), status: label(st.statusOf(x.id)), defenses: [...off, ...cus].join("; ") };
      });
      const recs: string[] = [];
      sel.filter((x) => st.statusOf(x.id) === "gap").sort((a, b) => b.severity - a.severity).slice(0, 6).forEach((x) => {
        const m = MITIGATIONS[x.mitigations[0]!]!;
        recs.push(tr(`Close gap on ${x.id} ${x.en}: implement ${m.id} ${m.en}.`, `سد الثغرة في ${x.id} ${x.ar}: تطبيق ${m.id} ${m.ar}.`));
      });
      sel.filter((x) => st.statusOf(x.id) === "partial").slice(0, 4).forEach((x) =>
        recs.push(tr(`Complete partial defenses on ${x.id} ${x.en} to reach full coverage.`, `استكمال الدفاعات الجزئية في ${x.id} ${x.ar} للوصول لتغطية كاملة.`)));
      if (!recs.length) recs.push(tr("Maintain current controls and re-assess quarterly.", "الحفاظ على الضوابط الحالية وإعادة التقييم كل ربع سنة."));
      const { exportDocx } = await import("@/lib/report-docx");
      await exportDocx({ lang: st.lang, coverage: pct, posture, covered, partial, gaps, total: sel.length, tactics: tactics.map((t) => ({ ...t, name: t.plain })), rows, recommendations: recs, chart });
      toast.success(tr("Report downloaded", "تم تنزيل التقرير"));
    } catch (e) {
      console.error(e); toast.error(tr("Export failed", "فشل التصدير"));
    } finally { setBusy(false); }
  }

  if (!sel.length) return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-5xl">📊</div>
      <h1 className="mt-4 text-xl font-semibold">{tr("Nothing to report yet", "لا توجد بيانات للتقرير بعد")}</h1>
      <Link to="/" className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow">{tr("Open Attack Matrix", "افتح مصفوفة الهجمات")}</Link>
    </main>
  );

  const R = 70, C = 2 * Math.PI * R;
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{tr("Executive Report", "التقرير التنفيذي")}</h1>
        <button onClick={onExport} disabled={busy} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-violet px-5 py-2.5 text-sm font-semibold text-primary-foreground glow disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "📄"} {tr("Export Word report (.docx)", "تصدير تقرير Word (.docx)")}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="glass flex flex-col items-center rounded-2xl p-6">
          <svg viewBox="0 0 180 180" className="h-48 w-48 -rotate-90" style={{ filter: `drop-shadow(0 0 12px ${toneVar(pct)})` }}>
            <circle cx="90" cy="90" r={R} fill="none" stroke="var(--secondary)" strokeWidth="14" />
            <circle cx="90" cy="90" r={R} fill="none" stroke={toneVar(pct)} strokeWidth="14" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} style={{ transition: "stroke-dashoffset .8s" }} />
          </svg>
          <div className="-mt-32 mb-20 text-center"><div className="text-4xl font-extrabold">{pct}%</div><div className="text-[11px] text-muted-foreground">{tr("Defense coverage", "التغطية الدفاعية")}</div></div>
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: toneVar(pct), background: `color-mix(in oklab, ${toneVar(pct)} 18%, transparent)` }}>{posture}</span>
          <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
            <div><div className="text-xl font-bold text-success">{covered}</div><div className="text-[10px] text-muted-foreground">{tr("Defended", "محمية")}</div></div>
            <div><div className="text-xl font-bold text-warning">{partial}</div><div className="text-[10px] text-muted-foreground">{tr("Partial", "جزئية")}</div></div>
            <div><div className="text-xl font-bold text-danger">{gaps}</div><div className="text-[10px] text-muted-foreground">{tr("Gaps", "ثغرات")}</div></div>
          </div>
        </div>
        <div ref={chartRef} className="glass rounded-2xl p-5">
          <h2 className="mb-3 text-sm font-semibold">{tr("Coverage by tactic", "التغطية حسب التكتيك")}</h2>
          <div dir="ltr" style={{ height: Math.max(220, tactics.length * 46) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tactics} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid horizontal={false} stroke="var(--border)" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis type="category" dataKey="name" width={190} stroke="var(--muted-foreground)" fontSize={12} tick={{ fill: "var(--foreground)" }} />
                <Tooltip cursor={{ fill: "var(--secondary)" }} content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const d = payload[0].payload as (typeof tactics)[number];
                  return <div className="glass rounded-lg px-3 py-2 text-xs"><div className="font-semibold">{d.name}</div><div>{tr("Coverage", "التغطية")}: {d.pct}%</div><div className="text-success">{tr("Mitigated", "محمية")}: {d.covered}</div><div className="text-warning">{tr("Partial", "جزئية")}: {d.partial}</div><div className="text-danger">{tr("Gaps", "ثغرات")}: {d.gaps}</div></div>;
                }} />
                <Bar dataKey="pct" radius={[0, 8, 8, 0]} barSize={22} minPointSize={3}>
                  {tactics.map((t) => <Cell key={t.name} fill={toneVar(t.pct)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="glass mt-4 overflow-x-auto rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground"><tr className="border-b border-border"><th className="p-3 text-start">ID</th><th className="p-3 text-start">{tr("Technique", "التقنية")}</th><th className="p-3 text-start">{tr("Tactic", "التكتيك")}</th><th className="p-3 text-start">{tr("Status", "الحالة")}</th><th className="p-3 text-start">{tr("Defenses", "الدفاعات")}</th></tr></thead>
          <tbody>{sel.map((x) => { const s = st.statusOf(x.id); const n = x.mitigations.length + (st.custom[x.id]?.length ?? 0); return (
            <tr key={x.id} className="border-b border-border/50"><td className="p-3 font-mono text-xs text-primary">{x.id}</td><td className="p-3">{tr(x.en, x.ar)}</td><td className="p-3 text-xs text-muted-foreground">{x.tactic.emoji} {tr(x.tactic.en, x.tactic.ar)}</td>
              <td className={`p-3 text-xs font-semibold ${s === "covered" ? "text-success" : s === "partial" ? "text-warning" : "text-danger"}`}>{label(s)}</td><td className="p-3 text-xs text-muted-foreground">{n}</td></tr>); })}</tbody>
        </table>
      </div>
    </main>
  );
}
