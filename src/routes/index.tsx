import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Check, ArrowRight, ArrowLeft, X } from "lucide-react";
import { TACTICS, ALL_TECHNIQUES } from "@/lib/attack-data";
import { useStore, useT } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Attack Matrix — ATT&CKWISE" },
      { name: "description", content: "Select the MITRE ATT&CK Enterprise techniques you want to defend against." },
      { property: "og:title", content: "Attack Matrix — ATT&CKWISE" },
      { property: "og:description", content: "Select the MITRE ATT&CK Enterprise techniques you want to defend against." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatrixPage,
});

function MatrixPage() {
  const { selected, toggle, clear, search, lang } = useStore();
  const tr = useT();
  const cols = useRef<Record<string, HTMLDivElement | null>>({});
  const q = search.trim().toLowerCase();
  const match = (id: string, en: string, ar: string) => !q || id.toLowerCase().includes(q) || en.toLowerCase().includes(q) || ar.includes(q);
  const sel = ALL_TECHNIQUES.filter((x) => selected.includes(x.id));
  const sev = sel.reduce((a, x) => a + x.severity, 0);
  const sevLevel = sev === 0 ? null : sev >= 15 ? "bad" : sev >= 6 ? "mid" : "good";
  const tacticsHit = new Set(sel.map((x) => x.tactic.id)).size;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <main className="mx-auto max-w-[1600px] px-4 pb-32 pt-4">
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-2">
        {TACTICS.map((tc) => {
          const n = tc.techniques.filter((x) => selected.includes(x.id)).length;
          return (
            <button key={tc.id} onClick={() => cols.current[tc.id]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${n ? "border-primary/60 bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
              <span>{tc.emoji}</span>{tr(tc.en, tc.ar)}{n > 0 && <span className="rounded-full bg-primary px-1.5 font-mono text-[10px] text-primary-foreground">{n}</span>}
            </button>
          );
        })}
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto pb-4">
        {TACTICS.map((tc) => {
          const list = tc.techniques.filter((x) => match(x.id, x.en, x.ar));
          return (
            <div key={tc.id} ref={(el) => { cols.current[tc.id] = el; }} className="w-60 shrink-0 snap-start scroll-ms-4">
              <div className="glass mb-2 rounded-xl px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{tc.emoji}</span>
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{tc.techniques.length}</span>
                </div>
                <div className="mt-1 text-sm font-semibold leading-tight">{tr(tc.en, tc.ar)}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{tc.id}</div>
              </div>
              <div className="space-y-2">
                {list.map((x) => {
                  const on = selected.includes(x.id);
                  return (
                    <button key={x.id} onClick={() => toggle(x.id)} aria-pressed={on}
                      className={`glass relative block w-full rounded-lg p-2.5 text-start transition hover:border-primary/50 ${on ? "border-primary! bg-primary/10 glow" : ""}`}>
                      {on && <span className="absolute end-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-primary to-violet"><Check className="h-3 w-3 text-primary-foreground" /></span>}
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-semibold text-primary">{x.id}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${x.severity === 3 ? "bg-danger" : x.severity === 2 ? "bg-warning" : "bg-muted-foreground"}`} />
                      </div>
                      <div className="mt-0.5 pe-5 text-[13px] font-medium leading-snug">{tr(x.en, x.ar)}</div>
                      {lang === "ar" && <div className="text-[10px] text-muted-foreground" dir="ltr">{x.en}</div>}
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {x.platforms.slice(0, 3).map((p) => <span key={p} className="rounded bg-secondary px-1.5 py-0.5 text-[9px] text-muted-foreground" dir="ltr">{p}</span>)}
                        {x.platforms.length > 3 && <span className="text-[9px] text-muted-foreground">+{x.platforms.length - 3}</span>}
                      </div>
                    </button>
                  );
                })}
                {!list.length && <div className="py-4 text-center text-xs text-muted-foreground">—</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4">
        <div className="glass mx-auto flex max-w-4xl flex-wrap items-center gap-4 rounded-2xl px-5 py-3 shadow-2xl">
          <div>
            <div className="text-2xl font-bold leading-none">{selected.length}</div>
            <div className="text-[11px] text-muted-foreground">{tr(`techniques · ${tacticsHit} tactics`, `تقنية · ${tacticsHit} تكتيك`)}</div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{tr("Threat severity", "مستوى الخطورة")}</span>
            <span className={`rounded-full px-2.5 py-1 font-semibold ${sevLevel === "bad" ? "bg-danger/20 text-danger" : sevLevel === "mid" ? "bg-warning/20 text-warning" : sevLevel === "good" ? "bg-success/20 text-success" : "bg-secondary text-muted-foreground"}`}>
              {sevLevel === "bad" ? tr("Critical", "حرج") : sevLevel === "mid" ? tr("Elevated", "مرتفع") : sevLevel === "good" ? tr("Low", "منخفض") : "—"}
            </span>
          </div>
          <div className="ms-auto flex items-center gap-2">
            {selected.length > 0 && <button onClick={clear} className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary"><X className="h-3.5 w-3.5" />{tr("Clear", "مسح")}</button>}
            <Link to="/defense" disabled={!selected.length}
              className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-violet px-4 py-2 text-sm font-semibold text-primary-foreground glow ${!selected.length ? "pointer-events-none opacity-40" : ""}`}>
              🛡️ {tr("Build Defense Plan", "انتقل لخطة الدفاع")}<Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
