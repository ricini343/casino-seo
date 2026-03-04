import type { LegalStatus } from "@/lib/data";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "@/components/SiteIcon";

interface LegalStatusBadgeProps {
  status: LegalStatus;
  large?: boolean;
}

export default function LegalStatusBadge({ status, large }: LegalStatusBadgeProps) {
  const config: Record<LegalStatus, { label: string; icon: React.ReactNode; cls: string }> = {
    full: { label: "Fully Legal", icon: <CheckCircle size={13} />, cls: "badge-legal" },
    "sports-only": { label: "Sports Betting Legal", icon: <CheckCircle size={13} />, cls: "badge-legal" },
    limited: { label: "Limited", icon: <AlertTriangle size={13} />, cls: "badge-limited" },
    illegal: { label: "Not Legal", icon: <XCircle size={13} />, cls: "badge-illegal" },
    pending: { label: "Pending Legislation", icon: <Clock size={13} />, cls: "badge-limited" },
  };

  const { label, icon, cls } = config[status] ?? config.illegal;

  return (
    <span
      className={cls}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        ...(large ? { fontSize: "1rem", padding: "0.5rem 1.25rem" } : {}),
      }}
    >
      {icon} {label}
    </span>
  );
}
