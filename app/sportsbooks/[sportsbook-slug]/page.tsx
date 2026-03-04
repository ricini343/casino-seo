import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  sportsbooks,
  getSportsbookBySlug,
  getStatesForSportsbook,
  affiliateLink,
  tierToRating,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
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
    title: `${sb.name} Review ${SITE.currentYear} — Bonus, Odds & App Rating`,
    description: `Honest ${sb.name} review: ${sb.welcomeBonus}. iOS ${sb.appRatingIos}/5, ${sb.withdrawalSpeed} withdrawals. Full pros, cons, state availability, and bonus details.`,
  };
}

export default function SportsbookReviewPage({ params }: Props) {
  const sb = getSportsbookBySlug(params["sportsbook-slug"]);
  if (!sb) notFound();

  const availableStates = getStatesForSportsbook(sb.slug);
  const rating = tierToRating(sb.tier);

  const pros = sb.reviewHighlights
    .split(". ")
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter((s) => s.length > 5);

  const cons = sb.cons
    .split(". ")
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter((s) => s.length > 5);

  const relatedSportsbooks = sportsbooks
    .filter((s) => s.slug !== sb.slug && s.tier !== "tier3")
    .slice(0, 3);

  const faqs = [
    {
      q: `Is ${sb.name} legal and safe?`,
      a: `Yes. ${sb.name} is licensed and regulated by gaming commissions in every state it operates. Your funds are protected under state gambling laws. ${sb.name} currently operates in ${availableStates.length} states: ${availableStates.map((s) => s.name).join(", ")}.`,
    },
    {
      q: `What is the ${sb.name} welcome bonus?`,
      a: `${sb.name} currently offers new users: ${sb.welcomeBonus}. This is a ${sb.welcomeBonusType.replace(/-/g, " ")} offer. Always check the current terms on ${sb.name}'s site as offers change regularly. Minimum odds and other restrictions may apply.`,
    },
    {
      q: `What is the ${sb.name} promo code?`,
      a: `The ${sb.promoCodeName} is sometimes required at sign-up to unlock the welcome bonus. Check our link above for the current code — some offers activate automatically without a code. Promo codes can change, so verify on the ${sb.name} website.`,
    },
    {
      q: `How do I withdraw money from ${sb.name}?`,
      a: `${sb.name} supports withdrawals via ${sb.paymentMethods.slice(0, 4).join(", ")}. Processing time is ${sb.withdrawalSpeed}. To initiate a withdrawal, go to the cashier/wallet section in the app or website. Your account must be verified (KYC) before withdrawals are processed.`,
    },
    {
      q: `Is ${sb.name} available in my state?`,
      a: `${sb.name} is currently available in ${availableStates.length} states: ${availableStates.map((s) => s.name).join(", ")}. You must be physically located within one of these states to place bets, even if you opened your account elsewhere.`,
    },
  ];

  return (
    <>
      {/* Hero */}
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
              { label: sb.name },
            ]}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1.25rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(0,255,135,0.08)",
                border: "2px solid rgba(0,255,135,0.25)",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                flexShrink: 0,
              }}
            >
              ⚡
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  marginBottom: "0.5rem",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {sb.name} Review
                </h1>
                {sb.tier === "tier1" && (
                  <span
                    style={{
                      padding: "2px 10px",
                      background: "rgba(0,255,135,0.12)",
                      border: "1px solid rgba(0,255,135,0.35)",
                      borderRadius: "9999px",
                      color: "var(--green)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                    }}
                  >
                    TOP PICK
                  </span>
                )}
              </div>
              <StarRating rating={rating} size="md" />
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9375rem",
                  margin: "0.5rem 0 0",
                }}
              >
                {sb.company} · Est. {sb.founded} · {availableStates.length} states
              </p>
            </div>
          </div>

          {sb.importantNote && (
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.625rem 1rem",
                background: "rgba(255,165,0,0.08)",
                border: "1px solid rgba(255,165,0,0.3)",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                color: "#ffa500",
              }}
            >
              ℹ <strong>Important:</strong> {sb.importantNote}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Bonus callout */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(0,255,135,0.04) 100%)",
            border: "2px solid rgba(0,255,135,0.35)",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.375rem",
                }}
              >
                New User Offer
              </div>
              <div
                style={{
                  color: "var(--green)",
                  fontWeight: 900,
                  fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                  marginBottom: "0.25rem",
                }}
              >
                {sb.welcomeBonus}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                {sb.promoCodeName} · {sb.welcomeBonusType.replace(/-/g, " ")}
              </div>
            </div>
            {!sb.affiliateWarning ? (
              <Link
                href={affiliateLink(sb.slug)}
                className="btn-primary"
                rel="nofollow sponsored"
                style={{ whiteSpace: "nowrap" }}
              >
                Claim Bonus →
              </Link>
            ) : (
              <div
                style={{
                  padding: "0.625rem 1rem",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "0.5rem",
                  fontSize: "0.8125rem",
                  color: "#ef4444",
                  maxWidth: "280px",
                }}
              >
                ⚠ {sb.affiliateWarning}
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(0,255,135,0.15)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            {SITE.minAge}+. Gambling problem? Call {SITE.helpline}. T&Cs apply. Available in:{" "}
            {availableStates.map((s) => s.abbr).join(", ")}.
          </div>
        </div>

        {/* Quick stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {[
            { label: "iOS Rating", value: `${sb.appRatingIos} / 5`, icon: "📱" },
            { label: "Android Rating", value: `${sb.appRatingAndroid} / 5`, icon: "🤖" },
            { label: "Withdrawal", value: sb.withdrawalSpeed.split(" ")[0] + "…", icon: "💸" },
            { label: "Live Betting", value: "Yes", icon: "⚡" },
            { label: "Loyalty", value: sb.loyaltyProgram ?? "None", icon: "🏆" },
            { label: "Founded", value: sb.founded, icon: "📅" },
            { label: "Monthly Users", value: `${(sb.estimatedUsMonthlyUsers / 1_000_000).toFixed(1)}M`, icon: "👥" },
            { label: "Casino", value: sb.alsoHasCasino ? "Yes" : "No", icon: "🎰" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: "0.875rem", textAlign: "center" }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{stat.icon}</div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "3px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontSize: "0.9375rem",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Pros and Cons */}
        <section>
          <h2 className="section-title">{sb.name} Pros & Cons</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                background: "rgba(0,255,135,0.05)",
                border: "1px solid rgba(0,255,135,0.2)",
                borderRadius: "0.75rem",
                padding: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: "var(--green)",
                  marginBottom: "0.75rem",
                  fontSize: "0.9375rem",
                }}
              >
                ✅ Pros
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {pros.map((pro, i) => (
                  <li
                    key={i}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                      paddingBottom: "0.5rem",
                      borderBottom:
                        i < pros.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      marginBottom: i < pros.length - 1 ? "0.5rem" : 0,
                    }}
                  >
                    ✓ {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: "rgba(239,68,68,0.04)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "0.75rem",
                padding: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: "#ef4444",
                  marginBottom: "0.75rem",
                  fontSize: "0.9375rem",
                }}
              >
                ❌ Cons
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {cons.map((con, i) => (
                  <li
                    key={i}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                      paddingBottom: "0.5rem",
                      borderBottom:
                        i < cons.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      marginBottom: i < cons.length - 1 ? "0.5rem" : 0,
                    }}
                  >
                    ✗ {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed review */}
        <article style={{ maxWidth: "680px" }}>
          <h2 className="section-title">{sb.name} — Full Review {SITE.currentYear}</h2>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.75rem" }}>
            App & User Experience
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {sb.name} is available on iOS and Android. The app is rated{" "}
            <strong style={{ color: "var(--green)" }}>{sb.appRatingIos}</strong>/5 on the
            Apple App Store and {sb.appRatingAndroid}/5 on Google Play.{" "}
            {sb.appRatingIos >= 4.7
              ? "This places it among the top-rated sportsbook apps in the US — the interface is fast, stable, and easy to navigate."
              : sb.appRatingIos >= 4.4
              ? "User ratings indicate a solid, reliable app experience."
              : "Some users report occasional performance issues — check recent reviews before downloading."}{" "}
            Key features include: {sb.uniqueFeatures.join(", ")}.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Welcome Bonus Analysis
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            The{" "}
            <strong style={{ color: "var(--green)" }}>{sb.welcomeBonus}</strong> offer is a{" "}
            {sb.welcomeBonusType.replace(/-/g, " ")} type bonus.{" "}
            {sb.welcomeBonusType === "matched-bet"
              ? "Matched bet bonuses convert your first qualifying bet into bonus credits win or lose. They typically require minimum odds."
              : sb.welcomeBonusType === "first-bet"
              ? "First bet offers refund your first bet in bonus credits if it loses. The refund value is capped at the stated maximum."
              : "Second chance offers provide a refund in bonus bets if your first qualifying wager loses."}{" "}
            Use the {sb.promoCodeName} when signing up to ensure the offer activates. Always
            verify current terms on {sb.name}&apos;s promotions page.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Betting Markets & Odds
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {sb.name} covers all major US sports (NFL, NBA, MLB, NHL, college football/basketball)
            plus golf, tennis, soccer, MMA, boxing, and international leagues. The platform
            features {sb.uniqueFeatures[0]} — {" "}
            {sb.uniqueFeatures.length > 1
              ? `along with ${sb.uniqueFeatures.slice(1).join(", ")}.`
              : "a key competitive advantage."}{" "}
            Shopping lines across multiple sportsbooks is the single best way to improve
            long-term betting results.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Deposits & Withdrawals
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "0.75rem",
            }}
          >
            {sb.name} supports these payment methods:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {sb.paymentMethods.map((method) => (
              <span
                key={method}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                }}
              >
                {method}
              </span>
            ))}
          </div>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Withdrawal speed: <strong style={{ color: "var(--text-primary)" }}>{sb.withdrawalSpeed}</strong>.
            PayPal and Venmo process fastest. ACH and wire transfers take 2-5 business days.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Customer Support
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            {sb.name} offers customer support via {sb.customerSupport.join(", ")}. For urgent
            issues with withdrawals or account access, contact the{" "}
            {availableStates[0]?.regulatoryBody ?? "state gaming regulator"} if {sb.name} does
            not resolve your issue.
          </p>
        </article>

        {/* Available states */}
        <section>
          <h2 className="section-title">Available In ({availableStates.length} States)</h2>
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
                ⚡ {s.name}
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title={`${sb.name} FAQ`} />

        {/* Bottom CTA */}
        {!sb.affiliateWarning && (
          <div className="highlight-box">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
                  Get your {sb.name} bonus today
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                  {sb.welcomeBonus} · Available in {availableStates.length} states
                </p>
              </div>
              <Link
                href={affiliateLink(sb.slug)}
                className="btn-primary"
                rel="nofollow sponsored"
              >
                Claim Bonus →
              </Link>
            </div>
          </div>
        )}

        {/* Related */}
        <section>
          <h2 className="section-title">More Sportsbook Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSportsbooks.map((s) => (
              <Link
                key={s.slug}
                href={`/sportsbooks/${s.slug}/`}
                className="card card-hover"
                style={{ textDecoration: "none" }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚡</div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {s.name}
                </div>
                <div style={{ color: "var(--green)", fontSize: "0.8125rem", fontWeight: 600 }}>
                  {s.welcomeBonus}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/sportsbooks/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            ← All Sportsbook Reviews
          </Link>
          {sb.alsoHasCasino && (
            <Link
              href={`/casinos/${sb.slug.replace("-sportsbook", "")}-casino/`}
              className="btn-outline"
              style={{ fontSize: "0.875rem" }}
            >
              {sb.name.replace("Sportsbook", "Casino")} →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
