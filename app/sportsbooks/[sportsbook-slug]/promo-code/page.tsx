import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  sportsbooks,
  getSportsbookBySlug,
  getStatesForSportsbook,
  affiliateLink,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";

interface Props {
  params: { "sportsbook-slug": string };
}

export async function generateStaticParams() {
  return sportsbooks.map((s) => ({ "sportsbook-slug": s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sb = getSportsbookBySlug(params["sportsbook-slug"]);
  if (!sb) return {};
  return {
    title: `${sb.name} Promo Code ${SITE.currentYear} — ${sb.welcomeBonus}`,
    description: `Use the latest ${sb.name} promo code to unlock: ${sb.welcomeBonus}. Step-by-step instructions, code details, and T&Cs explained. Updated ${SITE.currentYear}.`,
  };
}

export default function SportsbookPromoCodePage({ params }: Props) {
  const sb = getSportsbookBySlug(params["sportsbook-slug"]);
  if (!sb) notFound();

  const availableStates = getStatesForSportsbook(sb.slug);

  const faqs = [
    {
      q: `What is the ${sb.name} promo code for ${SITE.currentYear}?`,
      a: `The current ${sb.name} promo code is listed in the offer box above. Some offers activate automatically through our link without requiring a code. Always use our link to ensure the bonus applies to your account.`,
    },
    {
      q: `How do I use the ${sb.name} promo code?`,
      a: `1. Click the Claim Bonus button above. 2. Create your account. 3. Enter the promo code in the designated field during registration (if required). 4. Make your qualifying deposit or first bet. 5. Your bonus will credit to your account automatically.`,
    },
    {
      q: `Is the ${sb.name} promo code valid in my state?`,
      a: `${sb.name} is currently available in ${availableStates.length} states: ${availableStates.map((s) => s.name).join(", ")}. You must be physically located in one of these states when placing bets.`,
    },
    {
      q: `Can existing ${sb.name} users get a promo code?`,
      a: `The promo code ${sb.promoCodeName} is for new users only. Existing customers can find ongoing promotions in the ${sb.name} app under the Promotions or Bonuses section. Reload bonuses, odds boosts, and loyalty rewards are available for returning players.`,
    },
  ];

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #091520 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Sportsbooks", href: "/sportsbooks/" },
              { label: sb.name, href: `/sportsbooks/${sb.slug}/` },
              { label: "Promo Code" },
            ]}
          />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              marginBottom: "0.5rem",
            }}
          >
            {sb.name} Promo Code {SITE.currentYear}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            Latest working {sb.promoCodeName} — unlock{" "}
            <strong style={{ color: "var(--green)" }}>{sb.welcomeBonus}</strong>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Main offer box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(0,255,135,0.04) 100%)",
            border: "2px solid rgba(0,255,135,0.4)",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              {sb.name} Promo Code {SITE.currentYear}
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "rgba(0,255,135,0.15)",
                border: "2px dashed rgba(0,255,135,0.5)",
                borderRadius: "0.5rem",
                color: "var(--green)",
                fontWeight: 900,
                fontSize: "1.5rem",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              {sb.promoCodeName.toUpperCase().includes("CODE")
                ? "AUTO-APPLIED"
                : sb.promoCodeName.toUpperCase()}
            </div>
            <div
              style={{ color: "var(--green)", fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.5rem" }}
            >
              {sb.welcomeBonus}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {sb.welcomeBonusType.replace(/-/g, " ")} · Available in {availableStates.length} states
            </div>
          </div>

          {!sb.affiliateWarning ? (
            <div style={{ textAlign: "center" }}>
              <Link
                href={affiliateLink(sb.slug)}
                className="btn-primary"
                rel="nofollow sponsored"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
              >
                Claim {sb.welcomeBonus} →
              </Link>
            </div>
          ) : (
            <div
              style={{
                padding: "1rem",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "0.5rem",
                textAlign: "center",
                color: "#ef4444",
              }}
            >
              ⚠ {sb.affiliateWarning}
            </div>
          )}

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(0,255,135,0.15)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            {SITE.minAge}+. Gambling problem? Call {SITE.helpline}. T&Cs apply.
          </div>
        </div>

        {/* How to claim */}
        <section>
          <h2 className="section-title">How to Use the {sb.name} Promo Code</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { step: 1, title: "Click our link", desc: `Use the Claim Bonus button above to go to ${sb.name}. Our link may auto-apply the bonus — no code needed.` },
              { step: 2, title: "Create your account", desc: `Enter your name, email, address, and last 4 digits of SSN for identity verification. All licensed US sportsbooks require KYC.` },
              { step: 3, title: `Enter ${sb.promoCodeName}`, desc: `Look for the promo code field during sign-up. Enter the code exactly as shown. Some offers apply automatically.` },
              { step: 4, title: "Make your deposit", desc: `Fund your account via ${sb.paymentMethods.slice(0, 3).join(", ")}, or another supported method. Most welcome offers require a minimum deposit.` },
              { step: 5, title: "Place your qualifying bet", desc: `${sb.welcomeBonusType === "matched-bet" ? `Bet $5+ on any qualifying market to trigger your bonus bets.` : `Place your first qualifying bet — if it loses, you receive bonus bet credits.`}` },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(0,255,135,0.15)",
                    border: "1px solid rgba(0,255,135,0.3)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "var(--green)",
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {title}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* States */}
        <section>
          <h2 className="section-title">
            Where Is {sb.name} Available? ({availableStates.length} States)
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {availableStates.map((s) => (
              <Link
                key={s.abbr}
                href={`/states/${s.slug}/best-sportsbooks/`}
                style={{
                  padding: "0.375rem 0.875rem",
                  border: "1px solid rgba(0,255,135,0.25)",
                  background: "rgba(0,255,135,0.06)",
                  borderRadius: "0.5rem",
                  color: "var(--green)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title={`${sb.name} Promo Code FAQ`} />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href={`/sportsbooks/${sb.slug}/`} className="btn-primary" style={{ fontSize: "0.875rem" }}>
            ← {sb.name} Full Review
          </Link>
          <Link href="/bonuses/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            All Sportsbook Bonuses
          </Link>
        </div>
      </div>
    </>
  );
}
