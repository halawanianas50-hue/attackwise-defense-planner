import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Shield, Search, ArrowRight, ArrowLeft, Languages } from "lucide-react";
import { useStore, useT } from "@/lib/store";

const STEPS = [
  { to: "/", emoji: "🎯", en: "Attack Matrix", ar: "حدد الهجمات" },
  { to: "/defense", emoji: "🛡️", en: "Defense Plan", ar: "خطة الدفاع" },
  { to: "/report", emoji: "📊", en: "Executive Report", ar: "التقرير النهائي" },
] as const;

export function AppHeader() {
  const { selected, search, setSearch, lang, setLang } = useStore();
  const tr = useT();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const nav = useNavigate();
  const idx = Math.max(0, STEPS.findIndex((s) => s.to === path));
  const next = STEPS[idx + 1];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-violet glow"><Shield className="h-5 w-5 text-primary-foreground" /></span>
          <span className="font-bold tracking-tight" dir="ltr">ATT&amp;CKWISE</span>
          <span className="hidden rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline" dir="ltr">Enterprise Matrix v14</span>
        </Link>
        <nav className="order-3 flex w-full justify-center gap-1 lg:order-none lg:w-auto lg:flex-1">
          {STEPS.map((s, i) => (
            <Link key={s.to} to={s.to}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${i === idx ? "bg-primary text-primary-foreground glow" : i < idx ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
              <span>{s.emoji}</span><span className="font-mono opacity-60">{i + 1}</span><span>{tr(s.en, s.ar)}</span>
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          {path === "/" && (
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute start-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={tr("Search T1566, phishing…", "ابحث T1566، تصيد…")}
                className="h-8 w-52 rounded-md border border-border bg-card ps-8 pe-2 text-xs outline-none focus:border-primary" />
            </div>
          )}
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{selected.length} {tr("Selected", "محدد")}</span>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-secondary" aria-label="Language">
            <Languages className="h-3.5 w-3.5" />{lang === "ar" ? "EN" : "ع"}
          </button>
          {next && (
            <button disabled={!selected.length} onClick={() => nav({ to: next.to })}
              className="flex h-8 items-center gap-1 rounded-md bg-gradient-to-r from-primary to-violet px-3 text-xs font-semibold text-primary-foreground glow disabled:opacity-40">
              {tr("Next Step", "الخطوة التالية")}<Arrow className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
