import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Trash2, Wrench, FileText, GraduationCap, Network } from "lucide-react";
import { toast } from "sonner";
import { ALL_TECHNIQUES, MITIGATIONS } from "@/lib/attack-data";
import { useStore, useT } from "@/lib/store";
import type { CustomMitigation, Status } from "@/lib/scoring";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/defense")({
  head: () => ({
    meta: [
      { title: "Defense Plan — ATT&CKWISE" },
      { name: "description", content: "Rate official MITRE mitigations and add your own enterprise defenses for each selected attack." },
      { property: "og:title", content: "Defense Plan — ATT&CKWISE" },
      { property: "og:description", content: "Rate official MITRE mitigations and add your own enterprise defenses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DefensePage,
});

const TYPE_ICON = { tool: Wrench, policy: FileText, training: GraduationCap, network: Network };

function StatusPicker({ value, onChange }: { value: Status | undefined; onChange: (s: Status) => void }) {
  const tr = useT();
  const opts: { s: Status; label: string; cls: string }[] = [
    { s: "full", label: tr("✅ Fully applied", "✅ مطبق بالكامل"), cls: "border-success bg-success/20 text-success" },
    { s: "partial", label: tr("⚠️ Partial", "⚠️ جزئي"), cls: "border-warning bg-warning/20 text-warning" },
    { s: "none", label: tr("❌ Not applied", "❌ غير مطبق"), cls: "border-danger bg-danger/20 text-danger" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {opts.map((o) => (
        <button key={o.s} onClick={() => onChange(o.s)}
          className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition ${value === o.s ? o.cls : "border-border text-muted-foreground hover:bg-secondary"}`}>{o.label}</button>
      ))}
    </div>
  );
}

function DefensePage() {
  const st = useStore();
  const tr = useT();
  const list = ALL_TECHNIQUES.filter((x) => st.selected.includes(x.id));
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { if ((!active || !st.selected.includes(active)) && list[0]) setActive(list[0].id); }, [list, active, st.selected]);
  const cur = list.find((x) => x.id === active);
  const statuses = list.map((x) => st.statusOf(x.id));
  const gaps = statuses.filter((s) => s === "gap").length;
  const covered = statuses.filter((s) => s === "covered").length;

  if (!list.length) return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-5xl">🎯</div>
      <h1 className="mt-4 text-xl font-semibold">{tr("No attacks selected yet", "لم يتم تحديد أي هجمات بعد")}</h1>
      <Link to="/" className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow">{tr("Open Attack Matrix", "افتح مصفوفة الهجمات")}</Link>
    </main>
  );

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-5">
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label={tr("Coverage", "نسبة التغطية")} value={`${st.coverage}%`} tone={st.coverage > 75 ? "success" : st.coverage >= 40 ? "warning" : "danger"} />
        <Stat label={tr("Defended", "محمية")} value={covered} tone="success" />
        <Stat label={tr("Gaps", "ثغرات")} value={gaps} tone="danger" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <div className="space-y-2">
          {list.map((x) => (
            <button key={x.id} onClick={() => setActive(x.id)}
              className={`glass block w-full rounded-xl p-3 text-start transition hover:border-primary/50 ${active === x.id ? "border-primary! glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-primary">{x.id}</span>
                <StatusBadge s={st.statusOf(x.id)} />
              </div>
              <div className="mt-1 text-sm font-medium">{tr(x.en, x.ar)}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{x.tactic.emoji} {tr(x.tactic.en, x.tactic.ar)}</div>
            </button>
          ))}
        </div>

        {cur && (
          <section className="glass h-fit rounded-2xl p-5 lg:sticky lg:top-20">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-sm text-primary">{cur.id} · {cur.tactic.emoji} {tr(cur.tactic.en, cur.tactic.ar)}</div>
                <h2 className="text-xl font-bold">{tr(cur.en, cur.ar)}</h2>
                {st.lang === "ar" && <div className="text-xs text-muted-foreground" dir="ltr">{cur.en}</div>}
              </div>
              <StatusBadge s={st.statusOf(cur.id)} />
            </div>

            <h3 className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("Official MITRE mitigations", "الدفاعات الرسمية من MITRE")}</h3>
            <div className="space-y-2">
              {cur.mitigations.map((mid) => {
                const m = MITIGATIONS[mid]!;
                return (
                  <div key={mid} className="rounded-xl border border-border bg-background/40 p-3">
                    <div className="flex items-center gap-2"><span className="font-mono text-[11px] text-violet">{mid}</span><span className="text-sm font-semibold">{tr(m.en, m.ar)}</span></div>
                    <p className="mt-1 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{tr("How it stops the attack: ", "آلية الصد: ")}</span>{tr(m.howEn, m.howAr)}</p>
                    <div className="mt-2"><StatusPicker value={st.ratings[cur.id]?.[mid]} onChange={(s) => st.rate(cur.id, mid, s)} /></div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr("Custom enterprise defenses", "دفاعات المؤسسة المخصصة")}</h3>
              <button onClick={() => setOpen(true)} className="flex items-center gap-1 rounded-md border border-primary/50 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20"><Plus className="h-3.5 w-3.5" />{tr("Add defense", "إضافة دفاع")}</button>
            </div>
            <div className="space-y-2">
              {(st.custom[cur.id] ?? []).map((c) => {
                const I = TYPE_ICON[c.type];
                return (
                  <div key={c.id} className="rounded-xl border border-violet/40 bg-violet/5 p-3">
                    <div className="flex items-center gap-2"><I className="h-4 w-4 text-violet" /><span className="text-sm font-semibold">{c.name}</span>
                      <button onClick={() => st.removeCustom(cur.id, c.id)} className="ms-auto text-muted-foreground hover:text-danger" aria-label="Remove"><Trash2 className="h-3.5 w-3.5" /></button></div>
                    {c.how && <p className="mt-1 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{tr("How it stops the attack: ", "آلية الصد: ")}</span>{c.how}</p>}
                    <div className="mt-2"><StatusPicker value={c.status} onChange={(s) => st.rateCustom(cur.id, c.id, s)} /></div>
                  </div>
                );
              })}
              {!(st.custom[cur.id] ?? []).length && <p className="text-xs text-muted-foreground">{tr("e.g. CrowdStrike Falcon, Email Gateway Filter…", "مثال: CrowdStrike Falcon، فلتر بوابة البريد…")}</p>}
            </div>
            <CustomDialog open={open} onOpenChange={setOpen} onSave={(m) => { st.addCustom(cur.id, m); toast.success(tr("Defense added", "تمت إضافة الدفاع")); }} />
          </section>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone: "success" | "warning" | "danger" }) {
  const c = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  return <div className="glass rounded-xl px-4 py-3"><div className="text-[11px] text-muted-foreground">{label}</div><div className={`text-2xl font-bold ${c}`}>{value}</div></div>;
}

function CustomDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (b: boolean) => void; onSave: (m: Omit<CustomMitigation, "id">) => void }) {
  const tr = useT();
  const [name, setName] = useState(""); const [type, setType] = useState<CustomMitigation["type"]>("tool"); const [how, setHow] = useState("");
  const types: [CustomMitigation["type"], string, string][] = [["tool", "Tool", "أداة"], ["policy", "Policy", "سياسة"], ["training", "Training", "تدريب"], ["network", "Network", "شبكة"]];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass">
        <DialogHeader><DialogTitle>{tr("Add custom defense", "إضافة دفاع مخصص")}</DialogTitle></DialogHeader>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; onSave({ name: name.trim(), type, how: how.trim(), status: "full" }); setName(""); setHow(""); onOpenChange(false); }}>
          <label className="block text-xs font-medium">{tr("Defense name", "اسم الدفاع")}
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="CrowdStrike Falcon" className="mt-1 h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" /></label>
          <div className="text-xs font-medium">{tr("Defense type", "نوع الدفاع")}
            <div className="mt-1 grid grid-cols-4 gap-1.5">{types.map(([v, en, ar]) => (
              <button type="button" key={v} onClick={() => setType(v)} className={`rounded-md border py-1.5 text-xs ${type === v ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}>{tr(en, ar)}</button>))}</div></div>
          <label className="block text-xs font-medium">{tr("Defense mechanism", "طريقة الصد")}
            <textarea value={how} onChange={(e) => setHow(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></label>
          <button className="w-full rounded-lg bg-gradient-to-r from-primary to-violet py-2 text-sm font-semibold text-primary-foreground glow">{tr("Add to technique", "إضافة للتقنية")}</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
