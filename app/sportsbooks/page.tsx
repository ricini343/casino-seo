import type { Metadata } from "next";
import Link from "next/link";
import { sportsbooks, getStatesForSportsbook } from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
import { PhoneIcon, DollarIcon, TrophyIcon, InfoCircle, AlertTriangle } from "@/components/SiteIcon";

export const metadata: Metadata = {
  title: `Best Sports Betting Apps ${SITE.currentYear} — Top US Sportsbooks Ranked`,
  description: `Ranked: the best legal US sportsbooks for ${SITE.currentYear}. Compare welcome bonuses, odds quality, app ratings, and payouts from all licensed operators.`,
};

export default function SportsbooksPage() {
  const tier1 = sportsbooks.filter((s) => s.tier === "tier1");
  const tier2 = sportsbooks.filter((s) => s.tier === "tier2");
  const tier3 = sportsbooks.filter((s) => s.tier === "tier3");

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #091520 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Sportsbooks" }]} />
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Best Sports Betting Apps — {SITE.currentYear}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.0625rem",
              margin: 0,
              maxWidth: "640px",
            }}
          >
            Every licensed US sportsbook ranked by odds quality, app rating, bonus value,
            and state availability. Updated {SITE.currentYear}.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Top tier */}
        <section>
          <h2 className="section-title">Top-Rated Sportsbooks</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {tier1.map((sb, i) => {
              const availableStates = getStatesForSportsbook(sb.slug);
              return (
                <div key={sb.slug} className="card" style={{ position: "relative" }}>
                  {i < 3 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "1.5rem",
                        background:
                          i === 0 ? "var(--gold)" : i === 1 ? "#c0c0c0" : "#cd7f32",
                        color: "#0a0e1a",
                        padding: "2px 12px",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        borderRadius: "0 0 6px 6px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      #{i + 1} PICK
                    </div>
                  )}
                  <div style={{ paddingTop: i < 3 ? "1.25rem" : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontWeight: 800,
                            fontSize: "1.125rem",
                            color: "var(--text-primary)",
                            marginBottom: "0.375rem",
                          }}
                        >
                          {sb.name}
                        </h3>
                        <StarRating
                          rating={
                            sb.appRatingIos >= 4.8
                              ? 5
                              : sb.appRatingIos >= 4.5
                              ? 4.5
                              : 4
                          }
                          size="sm"
                        />
                      </div>
                      <div
                        style={{
                          background: "rgba(0,255,135,0.08)",
                          border: "1px solid rgba(0,255,135,0.25)",
                          borderRadius: "0.5rem",
                          padding: "0.5rem 1rem",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "var(--green)",
                            fontWeight: 800,
                            fontSize: "0.9375rem",
                          }}
                        >
                          {sb.welcomeBonus}
                        </div>
                        <div
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.7rem",
                            marginTop: "2px",
                          }}
                        >
                          New User Offer
                        </div>
                      </div>
                    </div>

                    {sb.importantNote && (
                      <div
                        style={{
                          padding: "0.5rem 0.75rem",
                          background: "rgba(255,165,0,0.08)",
                          border: "1px solid rgba(255,165,0,0.3)",
                          borderRadius: "0.5rem",
                          fontSize: "0.8125rem",
                          color: "#ffa500",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <InfoCircle size={14} style={{ verticalAlign: "middle" }} /> {sb.importantNote}
                      </div>
                    )}

                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.9375rem",
                        lineHeight: "1.6",
                        margin: "0 0 1rem",
                      }}
                    >
                      {sb.reviewHighlights}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                        fontSize: "0.8125rem",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <PhoneIcon size={14} /> iOS{" "}
                        <strong style={{ color: "var(--green)" }}>{sb.appRatingIos}</strong>
                      </span>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <PhoneIcon size={14} /> Android{" "}
                        <strong style={{ color: "var(--green)" }}>{sb.appRatingAndroid}</strong>
                      </span>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <DollarIcon size={14} />{" "}
                        <strong style={{ color: "var(--text-primary)" }}>
                          {sb.withdrawalSpeed}
                        </strong>
                      </span>
                      {sb.loyaltyProgram && (
                        <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <TrophyIcon size={14} />{" "}
                          <strong style={{ color: "var(--text-primary)" }}>
                            {sb.loyaltyProgram}
                          </strong>
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.375rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {availableStates.slice(0, 8).map((s) => (
                        <Link
                          key={s.abbr}
                          href={`/states/${s.slug}/best-sportsbooks/`}
                          style={{
                            padding: "2px 8px",
                            background: "rgba(0,255,135,0.06)",
                            border: "1px solid rgba(0,255,135,0.2)",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            color: "var(--green)",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {s.abbr}
                        </Link>
                      ))}
                      {availableStates.length > 8 && (
                        <span
                          style={{
                            padding: "2px 8px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid var(--border)",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          +{availableStates.length - 8} more
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {!sb.affiliateWarning ? (
                        <Link
                          href={`/go/${sb.slug}/`}
                          className="btn-primary"
                          rel="nofollow sponsored"
                          style={{ fontSize: "0.875rem" }}
                        >
                          Claim Bonus →
                        </Link>
                      ) : (
                        <span
                          style={{
                            padding: "0.5rem 1rem",
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: "0.5rem",
                            fontSize: "0.8125rem",
                            color: "#ef4444",
                          }}
                        >
                          No affiliate program
                        </span>
                      )}
                      <Link
                        href={`/sportsbooks/${sb.slug}/`}
                        className="btn-outline"
                        style={{ fontSize: "0.875rem" }}
                      >
                        Full Review
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* More sportsbooks */}
        {(tier2.length > 0 || tier3.length > 0) && (
          <section>
            <h2 className="section-title">More Sportsbooks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...tier2, ...tier3].map((sb) => (
                <Link
                  key={sb.slug}
                  href={`/sportsbooks/${sb.slug}/`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card card-hover" style={{ height: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "var(--text-primary)",
                          margin: 0,
                        }}
                      >
                        {sb.name}
                      </h3>
                      <span
                        style={{ fontSize: "0.75rem", color: "var(--green)", fontWeight: 600 }}
                      >
                        {sb.appRatingIos} ★
                      </span>
                    </div>
                    {sb.importantNote && (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#ffa500",
                          marginBottom: "0.5rem",
                          fontWeight: 600,
                        }}
                      >
                        Note: {sb.importantNote}
                      </div>
                    )}
                    <p
                      style={{
                        color: "var(--green)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {sb.welcomeBonus}
                    </p>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.8125rem",
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      {sb.reviewHighlights.slice(0, 100)}...
                    </p>
                    {sb.affiliateWarning && (
                      <div
                        style={{
                          marginTop: "0.75rem",
                          padding: "0.375rem 0.625rem",
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "0.375rem",
                          fontSize: "0.7rem",
                          color: "#ef4444",
                        }}
                      >
                        ⚠ No affiliate program
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
