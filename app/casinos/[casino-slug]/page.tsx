import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  casinos,
  getCasinoBySlug,
  getStatesForCasino,
  affiliateLink,
  tierToRating,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
import FAQSection from "@/components/FAQSection";
import { CasinoIcon, SlotsIcon, CardsIcon, LiveIcon, SpeedIcon, TrophyIcon, DollarIcon, PhoneIcon, PokerIcon, AlertTriangle } from "@/components/SiteIcon";
import ReviewScoreCard from "@/components/ReviewScoreCard";
import NoiseOverlay from "@/components/NoiseOverlay";

interface Props {
  params: { "casino-slug": string };
}

export async function generateStaticParams() {
  return casinos.map((c) => ({ "casino-slug": c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const casino = getCasinoBySlug(params["casino-slug"]);
  if (!casino) return {};
  return {
    title: `${casino.name} Review ${SITE.currentYear} — Bonus, Games & RTP`,
    description: `Honest ${casino.name} review: ${casino.welcomeBonus}. ${casino.numberOfSlots}+ slots, ${casino.numberOfTableGames}+ table games, ${casino.rtp}% RTP. Full pros, cons, and bonus details.`,
  };
}

export default function CasinoReviewPage({ params }: Props) {
  const casino = getCasinoBySlug(params["casino-slug"]);
  if (!casino) notFound();

  const availableStates = getStatesForCasino(casino.slug);
  const rating = tierToRating(casino.tier);

  const pros = casino.reviewHighlights
    .split(". ")
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter((s) => s.length > 5);

  const cons = casino.cons
    .split(". ")
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter((s) => s.length > 5);

  const relatedCasinos = casinos
    .filter((c) => c.slug !== casino.slug && c.tier !== "tier3")
    .slice(0, 3);

  const faqs = [
    {
      q: `Is ${casino.name} legal and safe?`,
      a: `Yes. ${casino.name} is fully licensed and regulated in every state it operates. All games are certified fair, your funds are held in segregated accounts, and all operators must maintain reserves to cover player balances. Available in: ${availableStates.map((s) => s.name).join(", ")}.`,
    },
    {
      q: `What is the welcome bonus at ${casino.name}?`,
      a: `${casino.name} currently offers: ${casino.welcomeBonus}. The wagering requirement is ${casino.wageringRequirement}x — meaning you must wager the bonus amount ${casino.wageringRequirement} times before withdrawing. Always read the full terms on the casino's site before claiming.`,
    },
    {
      q: `What is the RTP at ${casino.name}?`,
      a: `${casino.name} has an average RTP (Return to Player) of ${casino.rtp}%. This means for every $100 wagered, players receive back approximately $${casino.rtp} on average over time. Individual game RTPs vary — slots typically range from 92-98%, while table games like blackjack can reach 99%+ with optimal strategy.`,
    },
    {
      q: `How fast are withdrawals at ${casino.name}?`,
      a: `${casino.name} processes withdrawals in ${casino.withdrawalSpeed}. Fastest methods are e-wallets (PayPal, Venmo). ACH bank transfers typically take 2-5 business days. Paper checks take the longest. All legitimate withdrawal requests must be processed — if refused, contact the state gaming regulator.`,
    },
    {
      q: `Does ${casino.name} have live dealer games?`,
      a: casino.liveDealer
        ? `Yes. ${casino.name} offers ${casino.numberOfLiveDealerGames}+ live dealer games including blackjack, roulette, baccarat, and game shows. Games stream in real time from professional studios powered by ${casino.softwareProviders.includes("Evolution Gaming") ? "Evolution Gaming, the industry leader in live dealer" : casino.softwareProviders[0]}.`
        : `${casino.name} does not currently offer live dealer games. For live dealer options, consider BetMGM Casino or FanDuel Casino.`,
    },
  ];

  const schema = casino.reviewScores
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          name: casino.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: casino.reviewScores.overall.toFixed(1),
          bestRating: "10",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: "BetStateUSA Editorial Team",
        },
        publisher: {
          "@type": "Organization",
          name: "BetStateUSA",
        },
        datePublished: casino.lastUpdated ?? "2026-01-01",
        reviewBody: casino.reviewHighlights,
      }
    : null;

  return (
    <>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #120a1a 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NoiseOverlay />
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Online Casinos", href: "/casinos/" },
              { label: casino.name },
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
                background: "rgba(255,215,0,0.1)",
                border: "2px solid rgba(255,215,0,0.3)",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)",
                flexShrink: 0,
              }}
            >
              <CasinoIcon size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <h1
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {casino.name} Review
                </h1>
                {casino.tier === "tier1" && (
                  <span
                    style={{
                      padding: "2px 10px",
                      background: "rgba(255,215,0,0.15)",
                      border: "1px solid rgba(255,215,0,0.4)",
                      borderRadius: "9999px",
                      color: "var(--gold)",
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
                {casino.company} · Est. {casino.founded} · {availableStates.length} states
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                <span>By <strong style={{ color: "var(--text-secondary)" }}>BetStateUSA Editorial Team</strong></span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>
                  Updated{" "}
                  {casino.lastUpdated
                    ? new Date(casino.lastUpdated).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    : SITE.currentYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Bonus callout */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.06) 100%)",
            border: "2px solid rgba(255,215,0,0.4)",
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
                Welcome Bonus
              </div>
              <div
                style={{
                  color: "var(--gold)",
                  fontWeight: 900,
                  fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                  marginBottom: "0.25rem",
                }}
              >
                {casino.welcomeBonus}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                {casino.wageringRequirement}x wagering requirement · {casino.welcomeBonusType.replace(/-/g, " ")}
              </div>
            </div>
            {!casino.affiliateWarning ? (
              <Link
                href={affiliateLink(casino.slug)}
                className="btn-gold"
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
                No affiliate program available
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,215,0,0.2)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            18+. Gambling problem? Call {SITE.helpline}. T&Cs apply. Available in:{" "}
            {availableStates.map((s) => s.abbr).join(", ")}.
          </div>
        </div>

        {/* Quick stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {[
            { label: "Slots", value: `${casino.numberOfSlots}+`, icon: <SlotsIcon size={20} /> },
            { label: "Table Games", value: `${casino.numberOfTableGames}+`, icon: <CardsIcon size={20} /> },
            { label: "Live Dealer", value: casino.liveDealer ? `${casino.numberOfLiveDealerGames}+` : "No", icon: <LiveIcon size={20} /> },
            { label: "RTP", value: `${casino.rtp}%`, icon: <SpeedIcon size={20} /> },
            { label: "Wagering", value: `${casino.wageringRequirement}x`, icon: <TrophyIcon size={20} /> },
            { label: "Withdrawal", value: casino.withdrawalSpeed.split(" ")[0] + "…", icon: <DollarIcon size={20} /> },
            { label: "Mobile App", value: casino.mobileApp.split(",")[0], icon: <PhoneIcon size={20} /> },
            { label: "Poker", value: casino.hasPoker ? "Yes" : "No", icon: <PokerIcon size={20} /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: "0.875rem", textAlign: "center" }}
            >
              <div style={{ color: "var(--green)", display: "flex", justifyContent: "center", marginBottom: "0.25rem" }}>{stat.icon}</div>
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
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Review Score Breakdown */}
        {casino.reviewScores && (
          <section>
            <h2 className="section-title">{casino.name} Rating Breakdown</h2>
            <ReviewScoreCard scores={casino.reviewScores} type="casino" />
          </section>
        )}

        {/* Pros and Cons */}
        <section>
          <h2 className="section-title">{casino.name} Pros & Cons</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
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
                Pros
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
                      borderBottom: i < pros.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
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
                Cons
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
                      borderBottom: i < cons.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
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
          <h2 className="section-title">{casino.name} — Full Review</h2>

          <h3
            style={{ fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.75rem" }}
          >
            Game Selection
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {casino.name} offers {casino.numberOfSlots}+ slot titles from leading software
            providers including {casino.softwareProviders.join(", ")}. The slot library spans
            classic 3-reel games, modern video slots, jackpot games, and exclusive titles.
            Table game players have access to {casino.numberOfTableGames}+ games including
            multiple blackjack variants, roulette, baccarat, and casino poker.
            {casino.liveDealer
              ? ` The live dealer section features ${casino.numberOfLiveDealerGames}+ games streamed in real time.`
              : ""}
            {casino.hasPoker ? " Poker players can enjoy real-money poker tables as well." : ""}
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            RTP and Fairness
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {casino.name} maintains an average RTP (Return to Player) of{" "}
            <strong style={{ color: "var(--gold)" }}>{casino.rtp}%</strong> — meaning the
            casino returns approximately ${casino.rtp} for every $100 wagered over time.{" "}
            {casino.rtp >= 97
              ? "This is among the highest RTPs of any licensed US online casino."
              : casino.rtp >= 96.5
              ? "This is above the US online casino average of approximately 96%."
              : "This is in line with the US online casino industry average."}{" "}
            All games are certified by independent testing labs and the{" "}
            {availableStates[0]?.regulatoryBody ?? "state gaming regulator"} for fairness.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Welcome Bonus Details
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            New players receive: <strong style={{ color: "var(--gold)" }}>{casino.welcomeBonus}</strong>.
            The wagering requirement is {casino.wageringRequirement}x.{" "}
            {casino.wageringRequirement <= 5
              ? "This is an extremely player-friendly requirement — one of the best in the US market."
              : casino.wageringRequirement <= 15
              ? "This is a reasonable requirement below the industry average."
              : "Read the terms carefully before claiming — higher wagering requirements mean more play-through before withdrawal."}{" "}
            Bonus terms, eligible games, and expiry dates are listed on {casino.name}&apos;s
            promotions page.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Payment Methods
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            {casino.name} accepts the following payment methods:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {casino.paymentMethods.map((method) => (
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
            Withdrawal speed: <strong style={{ color: "var(--text-primary)" }}>{casino.withdrawalSpeed}</strong>.
            E-wallets like PayPal process the fastest. Wire transfers and checks take longer.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Mobile App
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {casino.name} offers a dedicated mobile app for {casino.mobileApp}. The full
            casino game library is available on mobile, including slots, table games,
            {casino.liveDealer ? " and live dealer games." : "."} You can deposit, withdraw,
            and contact support directly from the app.
          </p>

          {casino.loyaltyProgram && (
            <>
              <h3
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: "1.5rem 0 0.75rem",
                }}
              >
                Loyalty Program
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
                {casino.loyaltyProgram}
              </p>
            </>
          )}
        </article>

        {/* Available states */}
        <section>
          <h2 className="section-title">Available In ({availableStates.length} States)</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {availableStates.map((s) => (
              <Link
                key={s.abbr}
                href={`/states/${s.slug}/best-online-casinos/`}
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
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title={`${casino.name} FAQ`} />

        {/* Bottom CTA */}
        {!casino.affiliateWarning && (
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
                  Ready to claim your {casino.name} bonus?
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                  {casino.welcomeBonus} · {casino.wageringRequirement}x wagering ·{" "}
                  {availableStates.map((s) => s.abbr).join(", ")}
                </p>
              </div>
              <Link
                href={affiliateLink(casino.slug)}
                className="btn-gold"
                rel="nofollow sponsored"
              >
                Claim Bonus →
              </Link>
            </div>
          </div>
        )}

        {/* Related casinos */}
        <section>
          <h2 className="section-title">More Casino Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCasinos.map((c) => (
              <Link
                key={c.slug}
                href={`/casinos/${c.slug}/`}
                className="card card-hover"
                style={{ textDecoration: "none" }}
              >
                <div style={{ color: "var(--gold)", marginBottom: "0.5rem" }}><CasinoIcon size={28} /></div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {c.name}
                </div>
                <div style={{ color: "var(--gold)", fontSize: "0.8125rem", fontWeight: 600 }}>
                  {c.welcomeBonus}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/casinos/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            ← All Casino Reviews
          </Link>
          <Link href="/bonuses/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            Casino Bonuses
          </Link>
        </div>
      </div>
    </>
  );
}
