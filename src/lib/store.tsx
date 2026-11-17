import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findTechnique, type Lang } from "./attack-data";
import { techniqueStatus, coveragePct, type CustomMitigation, type Status, type TechStatus } from "./scoring";

interface State {
  lang: Lang;
  selected: string[];
  ratings: Record<string, Record<string, Status>>;
  custom: Record<string, CustomMitigation[]>;
}
const initial: State = { lang: "ar", selected: [], ratings: {}, custom: {} };

interface Ctx extends State {
  setLang: (l: Lang) => void;
  toggle: (id: string) => void;
  clear: () => void;
  rate: (tech: string, mit: string, s: Status) => void;
  addCustom: (tech: string, m: Omit<CustomMitigation, "id">) => void;
  rateCustom: (tech: string, id: string, s: Status) => void;
  removeCustom: (tech: string, id: string) => void;
  statusOf: (tech: string) => TechStatus;
  coverage: number;
  search: string;
  setSearch: (s: string) => void;
}
const C = createContext<Ctx | null>(null);
const KEY = "attackwise-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, set] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) set({ ...initial, ...JSON.parse(raw) }); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(s)); }, [s, loaded]);
  useEffect(() => {
    document.documentElement.lang = s.lang;
    document.documentElement.dir = s.lang === "ar" ? "rtl" : "ltr";
  }, [s.lang]);

  const value = useMemo<Ctx>(() => {
    const statusOf = (tech: string): TechStatus => {
      const t = findTechnique(tech);
      const r = s.ratings[tech] ?? {};
      const list: Status[] = [...(t?.mitigations ?? []).map((m) => r[m] ?? "none"), ...(s.custom[tech] ?? []).map((c) => c.status)];
      return techniqueStatus(list);
    };
    return {
      ...s, search, setSearch, statusOf,
      coverage: coveragePct(s.selected.map(statusOf)),
      setLang: (lang) => set((p) => ({ ...p, lang })),
      toggle: (id) => set((p) => ({ ...p, selected: p.selected.includes(id) ? p.selected.filter((x) => x !== id) : [...p.selected, id] })),
      clear: () => set((p) => ({ ...p, selected: [] })),
      rate: (tech, mit, st) => set((p) => ({ ...p, ratings: { ...p.ratings, [tech]: { ...p.ratings[tech], [mit]: st } } })),
      addCustom: (tech, m) => set((p) => ({ ...p, custom: { ...p.custom, [tech]: [...(p.custom[tech] ?? []), { ...m, id: `C${Date.now()}` }] } })),
      rateCustom: (tech, id, st) => set((p) => ({ ...p, custom: { ...p.custom, [tech]: (p.custom[tech] ?? []).map((c) => (c.id === id ? { ...c, status: st } : c)) } })),
      removeCustom: (tech, id) => set((p) => ({ ...p, custom: { ...p.custom, [tech]: (p.custom[tech] ?? []).filter((c) => c.id !== id) } })),
    };
  }, [s, search]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useStore = () => { const c = useContext(C); if (!c) throw new Error("StoreProvider missing"); return c; };
export const useT = () => { const { lang } = useStore(); return (en: string, ar: string) => (lang === "ar" ? ar : en); };
