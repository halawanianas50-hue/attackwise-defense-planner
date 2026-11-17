import type { TechStatus } from "@/lib/scoring";
import { useT } from "@/lib/store";
export function StatusBadge({ s }: { s: TechStatus }) {
  const tr = useT();
  const cls = s === "covered" ? "bg-success/15 text-success border-success/40" : s === "partial" ? "bg-warning/15 text-warning border-warning/40" : "bg-danger/15 text-danger border-danger/40";
  const label = s === "covered" ? tr("🛡️ Defended", "🛡️ محمي") : s === "partial" ? tr("◐ Partial", "◐ حماية جزئية") : tr("⚠️ Gap — needs defense", "⚠️ ثغرة بحاجة لدفاع");
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>{label}</span>;
}
