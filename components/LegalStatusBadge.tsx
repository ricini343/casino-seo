import type { LegalStatus } from "@/lib/data";

interface LegalStatusBadgeProps {
  status: LegalStatus;
  large?: boolean;
}

export default function LegalStatusBadge({ status, large }: LegalStatusBadgeProps) {
  const config: Record<LegalStatus, { label: string; icon: string; cls: string }> = {
    full: { label: "Fully Legal", icon: "✅", cls: "badge-legal" },
    "sports-only": { label: "Sports Betting Legal", icon: "✅", cls: "badge-legal" },
    limited: { label: "Limited", icon: "⚠️", cls: "badge-limited" },
    illegal: { label: "Not Legal", icon: "❌", cls: "badge-illegal" },
    pending: { label: "Pending Legislation", icon: "⏳", cls: "badge-limited" },
  };

  const { label, icon, cls } = config[status] ?? config.illegal;

  return (
    <span
      className={cls}
      style={large ? { fontSize: "1rem", padding: "0.5rem 1.25rem" } : undefined}
    >
      {icon} {label}
    </span>
  );
}
