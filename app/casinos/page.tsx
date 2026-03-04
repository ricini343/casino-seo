import type { Metadata } from "next";
import Link from "next/link";
import { casinos, getStatesForCasino } from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
import { SlotsIcon, CardsIcon, LiveIcon, AlertTriangle } from "@/components/SiteIcon";

export const metadata: Metadata = {
  title: `Best Online Casinos ${SITE.currentYear} — Top Real Money Casino Apps Ranked`,
  description: `Ranked: the best real-money online casinos in the US for ${SITE.currentYear}. Compare welcome bonuses, game counts, RTP, and payout speeds from all licensed operators.`,
};

export default function CasinosPage() {
  const tier1 = casinos.filter((c) => c.tier === "tier1");
  const tier2 = casinos.filter((c) => c.tier === "tier2");
  const tier3 = casinos.filter((c) => c.tier === "tier3");

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #120a1a 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Online Casinos" }]} />
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Best Online Casinos — {SITE.currentYear}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0, maxWidth: "640px" }}>
            Every licensed real-money online casino in the US, ranked by game selection,
            bonus value, RTP, and payout speed. All are 100% legal and regulated.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Top Picks */}
        <section>
          <h2 className="section-title">Top-Rated Online Casinos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {tier1.map((casino, i) => {
              const availableStates = getStatesForCasino(casino.slug);
              return (
                <div key={casino.slug} className="card" style={{ position: "relative" }}>
                  {i < 3 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "1.5rem",
                        background: i === 0 ? "var(--gold)" : i === 1 ? "#c0c0c0" : "#cd7f32",
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
                          {casino.name}
                        </h3>
                        <StarRating rating={casino.rtp >= 97 ? 5 : casino.rtp >= 96.5 ? 4.5 : 4} size="sm" />
                      </div>
                      <div
                        style={{
                          background: "rgba(255,215,0,0.1)",
                          border: "1px solid rgba(255,215,0,0.3)",
                          borderRadius: "0.5rem",
                          padding: "0.5rem 1rem",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "var(--gold)",
                            fontWeight: 800,
                            fontSize: "0.9375rem",
                          }}
                        >
                          {casino.welcomeBonus}
                        </div>
                        <div
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.7rem",
                            marginTop: "2px",
                          }}
                        >
                          Welcome Bonus
                        </div>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.9375rem",
                        lineHeight: "1.6",
                        margin: "0 0 1rem",
                      }}
                    >
                      {casino.reviewHighlights}
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
                        <SlotsIcon size={14} /> <strong style={{ color: "var(--text-primary)" }}>{casino.numberOfSlots}+</strong> slots
                      </span>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <CardsIcon size={14} /> <strong style={{ color: "var(--text-primary)" }}>{casino.numberOfTableGames}+</strong> table games
                      </span>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <LiveIcon size={14} /> <strong style={{ color: "var(--text-primary)" }}>{casino.numberOfLiveDealerGames}+</strong> live dealer
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        RTP: <strong style={{ color: "var(--green)" }}>{casino.rtp}%</strong>
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        Wagering: <strong style={{ color: casino.wageringRequirement <= 5 ? "var(--green)" : "var(--text-primary)" }}>{casino.wageringRequirement}x</strong>
                      </span>
                    </div>

                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}
                    >
                      {availableStates.slice(0, 6).map((s) => (
                        <Link
                          key={s.abbr}
                          href={`/states/${s.slug}/best-online-casinos/`}
                          style={{
                            padding: "2px 8px",
                            background: "rgba(255,215,0,0.07)",
                            border: "1px solid rgba(255,215,0,0.2)",
                            borderRadius: "9999px",
                            fontSize: "0.7rem",
                            color: "var(--gold)",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {s.abbr}
                        </Link>
                      ))}
                      {availableStates.length > 6 && (
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
                          +{availableStates.length - 6} more
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {!casino.affiliateWarning ? (
                        <Link
                          href={`/go/${casino.slug}/`}
                          className="btn-gold"
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
                        href={`/casinos/${casino.slug}/`}
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

        {/* More casinos */}
        {(tier2.length > 0 || tier3.length > 0) && (
          <section>
            <h2 className="section-title">More Online Casinos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...tier2, ...tier3].map((casino) => (
                <Link
                  key={casino.slug}
                  href={`/casinos/${casino.slug}/`}
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
                        {casino.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--gold)",
                          fontWeight: 600,
                        }}
                      >
                        {casino.rtp}% RTP
                      </span>
                    </div>
                    <p
                      style={{
                        color: "var(--gold)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {casino.welcomeBonus}
                    </p>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.8125rem",
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      {casino.reviewHighlights.slice(0, 100)}...
                    </p>
                    {casino.affiliateWarning && (
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

        {/* Find by state */}
        <section>
          <h2 className="section-title">Find Casinos by State</h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              marginBottom: "1rem",
            }}
          >
            Online casino gambling is only legal in a handful of US states. Find which casinos
            are available where you live.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {casinos
              .flatMap((c) => c.legalStates)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((abbr) => {
                const state = casinos
                  .flatMap((c) => c.legalStates.map((s) => s))
                  .includes(abbr)
                  ? abbr
                  : null;
                if (!state) return null;
                const stateSlug = {
                  NJ: "new-jersey",
                  PA: "pennsylvania",
                  MI: "michigan",
                  WV: "west-virginia",
                  CT: "connecticut",
                  DE: "delaware",
                  RI: "rhode-island",
                  IL: "illinois",
                  IN: "indiana",
                  AZ: "arizona",
                  CO: "colorado",
                  IA: "iowa",
                }[abbr];
                if (!stateSlug) return null;
                return (
                  <Link
                    key={abbr}
                    href={`/states/${stateSlug}/best-online-casinos/`}
                    style={{
                      padding: "0.375rem 0.875rem",
                      border: "1px solid rgba(255,215,0,0.25)",
                      background: "rgba(255,215,0,0.06)",
                      borderRadius: "0.5rem",
                      color: "var(--gold)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {abbr}
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
