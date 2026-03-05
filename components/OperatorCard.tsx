import Link from "next/link";
import StarRating from "./StarRating";
import { affiliateLink, tierToRating } from "@/lib/data";
import { CasinoIcon, SportsbookIcon, AlertTriangle } from "@/components/SiteIcon";

interface OperatorCardProps {
  name: string;
  slug: string;
  type: "casino" | "sportsbook";
  welcomeBonus: string;
  tier: string;
  uniqueFeature?: string;
  rank?: number;
  affiliateWarning?: string;
}

export default function OperatorCard({
  name,
  slug,
  type,
  welcomeBonus,
  tier,
  uniqueFeature,
  rank,
  affiliateWarning,
}: OperatorCardProps) {
  const rating = tierToRating(tier);
  const reviewHref = `/${type === "casino" ? "casinos" : "sportsbooks"}/${slug}/`;
  const affLink = affiliateLink(slug);

  return (
    <div
      className={`card card-hover${tier === "tier1" ? " card-tier1" : ""}`}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {rank && (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: rank <= 3 ? "linear-gradient(135deg,var(--gold),var(--green))" : "var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "0.875rem",
              color: rank <= 3 ? "var(--bg-primary)" : "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            {rank}
          </div>
        )}
        {/* Logo placeholder */}
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "0.5rem",
            background: "linear-gradient(135deg, var(--border), var(--border-light))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: type === "casino" ? "var(--gold)" : "var(--green)",
            flexShrink: 0,
          }}
        >
          {type === "casino" ? <CasinoIcon size={24} /> : <SportsbookIcon size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href={reviewHref} style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              {name}
            </Link>
            {tier === "tier1" && (
              <span
                style={{
                  padding: "2px 8px",
                  background: "rgba(255,215,0,0.15)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  borderRadius: "9999px",
                  color: "var(--gold)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                TOP PICK
              </span>
            )}
          </div>
          <StarRating rating={rating} size="sm" showNumber />
        </div>
      </div>

      {/* Bonus */}
      <div
        style={{
          background: "rgba(0,255,135,0.07)",
          border: "1px solid rgba(0,255,135,0.2)",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
        }}
      >
        <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
          Welcome Offer
        </div>
        <div style={{ color: "var(--green)", fontWeight: 700, fontSize: "0.9375rem" }}>
          {welcomeBonus}
        </div>
      </div>

      {uniqueFeature && (
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0, lineHeight: "1.5" }}>
          ✦ {uniqueFeature}
        </p>
      )}

      {affiliateWarning && (
        <p style={{ color: "#ef4444", fontSize: "0.8125rem", margin: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <AlertTriangle size={13} /> {affiliateWarning}
        </p>
      )}

      {/* CTAs */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {!affiliateWarning && (
          <Link
            href={affLink}
            className="btn-primary"
            style={{ flex: 1, textAlign: "center", fontSize: "0.875rem", padding: "0.625rem 1rem" }}
            rel="nofollow sponsored"
          >
            Claim Bonus →
          </Link>
        )}
        <Link
          href={reviewHref}
          className="btn-outline"
          style={{ flex: affiliateWarning ? 1 : "none", textAlign: "center", fontSize: "0.875rem", padding: "0.625rem 1rem" }}
        >
          Review
        </Link>
      </div>
    </div>
  );
}
