import type { Metadata } from "next";
import Link from "next/link";
import { sportsbooks, casinos, affiliateLink } from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Best Sportsbook & Casino Bonuses ${SITE.currentYear} — New User Offers Ranked`,
  description: `All current sportsbook and casino welcome bonuses in one place. Compare bonus codes, wagering requirements, and total value. Updated ${SITE.currentYear}.`,
};

export default function BonusesPage() {
  const sbBonuses = sportsbooks.filter((s) => !s.affiliateWarning);
  const casinoBonuses = casinos.filter((c) => !c.affiliateWarning);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Bonuses" }]} />
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Best Sportsbook & Casino Bonuses — {SITE.currentYear}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.0625rem",
              margin: 0,
              maxWidth: "640px",
            }}
          >
            Every current welcome bonus from licensed US operators. All offers verified
            and updated regularly. Always check operator site for latest terms.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Sportsbook bonuses */}
        <section>
          <h2 className="section-title">⚡ Sportsbook Welcome Bonuses</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {sbBonuses.map((sb, i) => (
              <div
                key={sb.slug}
                style={{
                  background: i === 0 ? "rgba(0,255,135,0.06)" : "var(--bg-card)",
                  border: `1px solid ${i === 0 ? "rgba(0,255,135,0.3)" : "var(--border)"}`,
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.375rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {i === 0 && (
                      <span
                        style={{
                          padding: "1px 8px",
                          background: "var(--green)",
                          color: "#0a0e1a",
                          borderRadius: "9999px",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                        }}
                      >
                        #1 PICK
                      </span>
                    )}
                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {sb.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.25rem",
                        padding: "1px 6px",
                      }}
                    >
                      {sb.promoCodeName}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "var(--green)",
                      fontWeight: 800,
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {sb.welcomeBonus}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                    {sb.welcomeBonusType.replace(/-/g, " ")} · {sb.withdrawalSpeed} withdrawals ·{" "}
                    <Link
                      href={`/sportsbooks/${sb.slug}/promo-code/`}
                      style={{ color: "var(--green)" }}
                    >
                      Promo code details →
                    </Link>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <Link
                    href={affiliateLink(sb.slug)}
                    className="btn-primary"
                    rel="nofollow sponsored"
                    style={{ fontSize: "0.8125rem", whiteSpace: "nowrap" }}
                  >
                    Claim →
                  </Link>
                  <Link
                    href={`/sportsbooks/${sb.slug}/`}
                    className="btn-outline"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Casino bonuses */}
        <section>
          <h2 className="section-title">🎰 Casino Welcome Bonuses</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {casinoBonuses.map((casino, i) => (
              <div
                key={casino.slug}
                style={{
                  background: i === 0 ? "rgba(255,215,0,0.05)" : "var(--bg-card)",
                  border: `1px solid ${i === 0 ? "rgba(255,215,0,0.3)" : "var(--border)"}`,
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.375rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {i === 0 && (
                      <span
                        style={{
                          padding: "1px 8px",
                          background: "var(--gold)",
                          color: "#0a0e1a",
                          borderRadius: "9999px",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                        }}
                      >
                        #1 PICK
                      </span>
                    )}
                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {casino.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {casino.wageringRequirement}x wagering
                    </span>
                    {casino.wageringRequirement <= 5 && (
                      <span
                        style={{
                          padding: "1px 6px",
                          background: "rgba(0,255,135,0.1)",
                          border: "1px solid rgba(0,255,135,0.3)",
                          borderRadius: "9999px",
                          fontSize: "0.65rem",
                          color: "var(--green)",
                          fontWeight: 700,
                        }}
                      >
                        LOW WAGERING
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      color: "var(--gold)",
                      fontWeight: 800,
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {casino.welcomeBonus}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                    {casino.welcomeBonusType.replace(/-/g, " ")} · {casino.rtp}% RTP ·{" "}
                    <Link
                      href={`/casinos/${casino.slug}/promo-code/`}
                      style={{ color: "var(--gold)" }}
                    >
                      Bonus code details →
                    </Link>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <Link
                    href={affiliateLink(casino.slug)}
                    className="btn-gold"
                    rel="nofollow sponsored"
                    style={{ fontSize: "0.8125rem", whiteSpace: "nowrap" }}
                  >
                    Claim →
                  </Link>
                  <Link
                    href={`/casinos/${casino.slug}/`}
                    className="btn-outline"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bonus guide */}
        <section style={{ maxWidth: "680px" }}>
          <h2 className="section-title">How to Claim Sports Betting Bonuses</h2>
          <ol
            style={{
              color: "var(--text-secondary)",
              lineHeight: "2",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Click Claim Bonus</strong> — Use
              our link to ensure the offer applies to your account.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Enter promo code</strong> — Some
              offers require a code at sign-up. Check the promo code field during registration.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Verify your identity (KYC)</strong>{" "}
              — All licensed operators require age and identity verification before deposits/withdrawals.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Make your qualifying deposit/bet</strong>{" "}
              — Most bonuses require a minimum first deposit or qualifying bet.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Meet wagering requirements</strong> —
              Play through the required amount before withdrawing bonus winnings.
            </li>
          </ol>
        </section>

        <div
          style={{
            padding: "1rem 1.5rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          {SITE.minAge}+ only. Gambling problem? Call {SITE.helpline}. All bonuses subject to
          operator terms and conditions. Offers subject to change without notice. {SITE.name} may
          receive compensation when you click affiliate links.
        </div>
      </div>
    </>
  );
}
