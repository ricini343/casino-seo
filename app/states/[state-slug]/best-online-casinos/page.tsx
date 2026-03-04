import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  states,
  getStateBySlug,
  getCasinosForState,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import OperatorCard from "@/components/OperatorCard";
import FAQSection from "@/components/FAQSection";

interface Props {
  params: { "state-slug": string };
}

export async function generateStaticParams() {
  return states
    .filter((s) => s.onlineCasinoLegal)
    .map((s) => ({ "state-slug": s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getStateBySlug(params["state-slug"]);
  if (!state) return {};
  return {
    title: `Best Online Casinos in ${state.name} ${SITE.currentYear} — Legal Real Money Gambling`,
    description: `Top-rated online casinos legal in ${state.name}. Compare bonuses, game selection, RTP, and payout speeds from all licensed operators. ${SITE.currentYear}.`,
  };
}

export default function StateBestCasinosPage({ params }: Props) {
  const state = getStateBySlug(params["state-slug"]);
  if (!state || !state.onlineCasinoLegal) notFound();

  const casinos = getCasinosForState(state.abbr);
  if (casinos.length === 0) notFound();

  const totalSlots = Math.max(...casinos.map((c) => c.numberOfSlots));
  const bestRtp = Math.max(...casinos.map((c) => c.rtp));

  const faqs = [
    {
      q: `Is online casino gambling legal in ${state.name}?`,
      a: `Yes. Online casino gambling has been legal in ${state.name} since ${state.casinoLaunchYear}. All ${casinos.length} casinos listed on this page are licensed and regulated by the ${state.regulatoryBody}.`,
    },
    {
      q: `What is the best online casino in ${state.name}?`,
      a: `${casinos[0]?.name ?? "BetMGM Casino"} is our top-rated online casino in ${state.name} based on game selection, bonus value, RTP, and app quality. However, the "best" casino depends on your preferences — some players prioritize live dealer games, others prefer slot variety or low wagering requirements.`,
    },
    {
      q: `What games can I play at online casinos in ${state.name}?`,
      a: `Licensed ${state.name} online casinos offer slots (up to ${totalSlots}+ titles), blackjack, roulette, baccarat, poker, and live dealer games. You can play for real money from your phone or computer while physically located within ${state.name}.`,
    },
    {
      q: `What is RTP and what should I look for?`,
      a: `RTP (Return to Player) is the percentage of wagers a casino's games return to players over time. For example, ${bestRtp}% RTP means for every $100 wagered, $${bestRtp} returns on average. Higher is better. Look for casinos with published RTP figures above 96%.`,
    },
    {
      q: `How fast can I withdraw my casino winnings?`,
      a: `Withdrawal speeds vary by casino and method. PayPal and e-wallets are typically fastest (1-3 business days). ACH bank transfers take 2-5 days. Paper checks can take 1-2 weeks. All licensed ${state.name} casinos must process legitimate withdrawal requests — if a site refuses to pay, contact the ${state.regulatoryBody}.`,
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
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "States", href: "/states/" },
              { label: state.name, href: `/states/${state.slug}/` },
              { label: "Best Online Casinos" },
            ]}
          />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Best Online Casinos in {state.name} ({SITE.currentYear})
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            {casinos.length} legal real-money casinos compared — bonuses, RTP, game count,
            and withdrawals. All licensed by the {state.regulatoryBody}.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Quick facts */}
        <div
          style={{
            background: "rgba(255,215,0,0.05)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: "0.75rem",
            padding: "1.25rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "Legal Since", value: state.casinoLaunchYear ?? "N/A" },
            { label: "Licensed Casinos", value: casinos.length },
            { label: "Minimum Age", value: `${state.ageRequirement ?? 21}+` },
            { label: "Best RTP", value: `${bestRtp}%` },
            { label: "Regulator", value: state.regulatoryBody.split("(")[0].trim() },
          ].map((f) => (
            <div key={f.label}>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "2px",
                }}
              >
                {f.label}
              </div>
              <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: "1rem" }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Ranked casinos */}
        <section>
          <h2 className="section-title">
            Top {casinos.length} Online Casinos in {state.name}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {casinos.map((casino, i) => (
              <OperatorCard
                key={casino.slug}
                type="casino"
                name={casino.name}
                slug={casino.slug}
                rank={i + 1}
                welcomeBonus={casino.welcomeBonus}
                tier={casino.tier}
                uniqueFeature={casino.reviewHighlights.split(".")[0]}
                affiliateWarning={casino.affiliateWarning}
              />
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section>
          <h2 className="section-title">Side-by-Side Comparison</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Casino</th>
                  <th>Welcome Bonus</th>
                  <th>Wagering</th>
                  <th>RTP</th>
                  <th>Slots</th>
                  <th>Withdrawal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {casinos.map((c) => (
                  <tr key={c.slug}>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {c.name}
                    </td>
                    <td>{c.welcomeBonus}</td>
                    <td
                      style={{
                        color: c.wageringRequirement <= 5 ? "var(--green)" : "inherit",
                        fontWeight: c.wageringRequirement <= 5 ? 700 : 400,
                      }}
                    >
                      {c.wageringRequirement}x
                    </td>
                    <td>{c.rtp}%</td>
                    <td>{c.numberOfSlots}+</td>
                    <td>{c.withdrawalSpeed}</td>
                    <td>
                      <Link
                        href={`/casinos/${c.slug}/`}
                        style={{
                          color: "var(--gold)",
                          fontWeight: 600,
                          fontSize: "0.8125rem",
                        }}
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Guide content */}
        <article style={{ maxWidth: "680px" }}>
          <h2 className="section-title">
            Online Casino Gambling in {state.name}: What You Need to Know
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Online casino gambling has been legal in {state.name} since {state.casinoLaunchYear}.
            Only {casinos.length} operators currently hold active casino licenses — these are the
            only apps where you can legally gamble for real money in the state.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Understanding Wagering Requirements
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Wagering requirements determine how many times you must play through a bonus before
            withdrawing. A 15x wagering requirement on a $100 bonus means you must wager $1,500
            before cashing out bonus winnings. FanDuel Casino and BetRivers both offer 1x
            wagering — far below the industry standard of 15-30x.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Game Selection: What to Expect
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {state.name} online casinos feature slots from top providers like IGT, NetEnt,
            Evolution Gaming, and Scientific Games — many of the same games found in Las Vegas.
            Live dealer tables (blackjack, roulette, baccarat, poker) stream in real time from
            professional studios.
          </p>

          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Responsible Gambling
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            All licensed {state.name} casinos must offer deposit limits, loss limits, session
            time limits, and self-exclusion options. If gambling is impacting your life,
            call the National Problem Gambling Helpline at{" "}
            <a href={`tel:${SITE.helpline.replace(/-/g, "")}`} style={{ color: "var(--green)" }}>
              {SITE.helpline}
            </a>{" "}
            (24/7, free, confidential).
          </p>
        </article>

        <FAQSection faqs={faqs} title={`${state.name} Online Casino FAQ`} />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href={`/states/${state.slug}/`}
            className="btn-primary"
            style={{ fontSize: "0.875rem" }}
          >
            ← Back to {state.name}
          </Link>
          <Link
            href={`/states/${state.slug}/legal-guide/`}
            className="btn-outline"
            style={{ fontSize: "0.875rem" }}
          >
            {state.name} Legal Guide
          </Link>
          <Link href="/casinos/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            All Casino Reviews
          </Link>
        </div>
      </div>
    </>
  );
}
