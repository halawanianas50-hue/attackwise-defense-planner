export type Status = "full" | "partial" | "none";
export interface CustomMitigation { id: string; name: string; type: "tool" | "policy" | "training" | "network"; how: string; status: Status }
export type TechStatus = "covered" | "partial" | "gap";

/** A technique is covered if any defense is fully applied, partial if any is partially applied, otherwise a gap. */
export function techniqueStatus(statuses: Status[]): TechStatus {
  if (statuses.includes("full")) return "covered";
  if (statuses.includes("partial")) return "partial";
  return "gap";
}

/** Coverage % = (covered + 0.5 × partial) / total, rounded. */
export function coveragePct(list: TechStatus[]): number {
  if (!list.length) return 0;
  const s = list.reduce((a, x) => a + (x === "covered" ? 1 : x === "partial" ? 0.5 : 0), 0);
  return Math.round((s / list.length) * 100);
}

export const levelOf = (pct: number) => (pct > 75 ? "good" : pct >= 40 ? "mid" : "bad");
