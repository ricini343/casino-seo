import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  casinos,
  getCasinoBySlug,
  getStatesForCasino,
  affiliateLink,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";

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
    title: `${casino.name} Bonus Code ${SITE.currentYear} — ${casino.welcomeBonus}`,
    description: `${casino.name} bonus code ${SITE.currentYear}: unlock ${casino.welcomeBonus} with ${casino.wageringRequirement}x wagering. Step-by-step guide and full terms explained.`,
  };
}

export default function CasinoPromoCodePage({ params }: Props) {
  const casino = getCasinoBySlug(params["casino-slug"]);
  if (!casino) notFound();

  const availableStates = getStatesForCasino(casino.slug);

  const faqs = [
    {
      q: `What is the ${casino.name} bonus code?`,
      a: `The ${casino.name} welcome bonus offer is: ${casino.welcomeBonus}. Click the Claim Bonus button above — our link may auto-apply the bonus. If prompted, enter the bonus code during registration.`,
    },
    {
      q: `What is the wagering requirement at ${casino.name}?`,
      a: `The wagering requirement at ${casino.name} is ${casino.wageringRequirement}x. This means you must wager the bonus amount ${casino.wageringRequirement} times before withdrawing bonus winnings. ${casino.wageringRequirement <= 5 ? "This is one of the lowest wagering requirements available at any US online casino." : casino.wageringRequirement <= 15 ? "This is below the US online casino average." : "Read the full terms carefully before claiming."}`,
    },
    {
      q: `Is ${casino.name} available in my state?`,
      a: `${casino.name} currently offers real-money gambling in: ${availableStates.map((s) => s.name).join(", ")}. Online casino gambling is only legal in a small number of US states — check our state legal guides for full details.`,
    },
    {
      q: `What games can I play with the ${casino.name} bonus?`,
      a: `The ${casino.name} welcome bonus is typically playable on ${casino.numberOfSlots}+ slots. Table games and live dealer games may have restricted contribution rates toward wagering requirements. Check the bonus terms for eligible games.`,
    },
  ];

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #120a1a 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Online Casinos", href: "/casinos/" },
              { label: casino.name, href: `/casinos/${casino.slug}/` },
              { label: "Bonus Code" },
            ]}
          />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              marginBottom: "0.5rem",
            }}
          >
            {casino.name} Bonus Code {SITE.currentYear}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            Unlock{" "}
            <strong style={{ color: "var(--gold)" }}>{casino.welcomeBonus}</strong> —{" "}
            {casino.wageringRequirement}x wagering requirement
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Offer box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.04) 100%)",
            border: "2px solid rgba(255,215,0,0.4)",
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
              {casino.name} Bonus Code {SITE.currentYear}
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "rgba(255,215,0,0.12)",
                border: "2px dashed rgba(255,215,0,0.5)",
                borderRadius: "0.5rem",
                color: "var(--gold)",
                fontWeight: 900,
                fontSize: "1.5rem",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}
            >
              AUTO-APPLIED
            </div>
            <div
              style={{
                color: "var(--gold)",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginBottom: "0.375rem",
              }}
            >
              {casino.welcomeBonus}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {casino.wageringRequirement}x wagering ·{" "}
              {casino.welcomeBonusType.replace(/-/g, " ")} · {availableStates.length} states
            </div>
          </div>

          {!casino.affiliateWarning ? (
            <div style={{ textAlign: "center" }}>
              <Link
                href={affiliateLink(casino.slug)}
                className="btn-gold"
                rel="nofollow sponsored"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
              >
                Claim {casino.welcomeBonus} →
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
              {casino.affiliateWarning}
            </div>
          )}

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,215,0,0.15)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            {SITE.minAge}+. Gambling problem? Call {SITE.helpline}. T&Cs apply.
          </div>
        </div>

        {/* Bonus details */}
        <section>
          <h2 className="section-title">{casino.name} Bonus Terms Explained</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            {[
              { label: "Bonus Amount", value: casino.welcomeBonus },
              { label: "Bonus Type", value: casino.welcomeBonusType.replace(/-/g, " ") },
              { label: "Wagering Req.", value: `${casino.wageringRequirement}x` },
              { label: "RTP", value: `${casino.rtp}%` },
              { label: "Available States", value: `${availableStates.length} states` },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  padding: "0.875rem",
                }}
              >
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color:
                      item.label === "Wagering Req." && casino.wageringRequirement <= 5
                        ? "var(--green)"
                        : "var(--text-primary)",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "0.9375rem" }}>
            {casino.wageringRequirement <= 5
              ? `${casino.name}'s ${casino.wageringRequirement}x wagering requirement is exceptional — far below the US industry average of 15-30x. This means you can withdraw bonus winnings much faster than with other casinos.`
              : casino.wageringRequirement <= 15
              ? `${casino.name}'s ${casino.wageringRequirement}x wagering requirement is below the US online casino average. Slots typically contribute 100% toward wagering, while table games may contribute less.`
              : `${casino.name}'s ${casino.wageringRequirement}x wagering requirement is above average. Make sure to read the full terms before claiming — slots typically contribute 100%, live dealer games may contribute 0%.`}
          </p>
        </section>

        {/* Available states */}
        <section>
          <h2 className="section-title">States Where This Bonus Is Available</h2>
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

        <FAQSection faqs={faqs} title={`${casino.name} Bonus Code FAQ`} />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href={`/casinos/${casino.slug}/`} className="btn-gold" style={{ fontSize: "0.875rem" }}>
            ← {casino.name} Full Review
          </Link>
          <Link href="/bonuses/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            All Casino Bonuses
          </Link>
        </div>
      </div>
    </>
  );
}
