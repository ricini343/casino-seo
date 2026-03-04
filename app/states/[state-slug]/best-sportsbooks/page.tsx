import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  states,
  getStateBySlug,
  getSportsbooksForState,
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
    .filter((s) => s.onlineSportsbookLegal)
    .map((s) => ({ "state-slug": s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getStateBySlug(params["state-slug"]);
  if (!state) return {};
  return {
    title: `Best Sports Betting Apps in ${state.name} ${SITE.currentYear} — Top Legal Sportsbooks`,
    description: `Compare the top ${state.name} sportsbooks. Find the best welcome bonuses, odds, and features from licensed operators. Updated ${SITE.currentYear}.`,
  };
}

export default function StateBestSportsbooksPage({ params }: Props) {
  const state = getStateBySlug(params["state-slug"]);
  if (!state || !state.onlineSportsbookLegal) notFound();

  const sportsbooks = getSportsbooksForState(state.abbr);
  if (sportsbooks.length === 0) notFound();

  const faqs = [
    {
      q: `What sportsbooks are legal in ${state.name}?`,
      a: `There are currently ${sportsbooks.length} licensed sportsbook apps operating legally in ${state.name}: ${sportsbooks.map((s) => s.name).join(", ")}. All are regulated by the ${state.regulatoryBody}.`,
    },
    {
      q: `What is the best sportsbook in ${state.name}?`,
      a: `${sportsbooks[0]?.name ?? "DraftKings"} is generally considered the top-rated sportsbook in ${state.name} based on app quality, odds, bonus value, and user base. However, having accounts at multiple books lets you shop for the best lines on every bet — a strategy used by professional bettors.`,
    },
    {
      q: `Do I have to be in ${state.name} to bet?`,
      a: `Yes. All licensed sportsbooks use geolocation technology to verify you are physically located within ${state.name} state lines when placing bets. You can create an account from anywhere, but bets can only be placed while within the state.`,
    },
    {
      q: `What is the minimum age to bet in ${state.name}?`,
      a: `The minimum age to bet on sports in ${state.name} is ${state.ageRequirement ?? 21}. All sportsbooks are required to verify your age and identity before you can deposit or wager.`,
    },
    {
      q: `Can I use multiple sportsbooks in ${state.name}?`,
      a: `Absolutely — and you should. Using multiple sportsbooks allows you to compare odds, claim multiple welcome bonuses, and always get the best available line. Most serious bettors have accounts at 3+ sportsbooks.`,
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
        <div className="max-w-5xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "States", href: "/states/" },
              { label: state.name, href: `/states/${state.slug}/` },
              { label: "Best Sportsbooks" },
            ]}
          />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Best Sports Betting Apps in {state.name} ({SITE.currentYear})
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            {sportsbooks.length} licensed sportsbooks compared by bonus value, odds quality,
            app rating, and payout speed. All are 100% legal in {state.name}.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Quick facts */}
        <div
          style={{
            background: "rgba(0,255,135,0.05)",
            border: "1px solid rgba(0,255,135,0.2)",
            borderRadius: "0.75rem",
            padding: "1.25rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "Legal Since", value: state.sportsbookLaunchYear ?? "N/A" },
            { label: "Licensed Apps", value: sportsbooks.length },
            { label: "Minimum Age", value: `${state.ageRequirement ?? 21}+` },
            { label: "Tax Rate (GGR)", value: state.taxRate !== null ? `${state.taxRate}%` : "N/A" },
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
              <div style={{ color: "var(--green)", fontWeight: 700, fontSize: "1rem" }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Ranked sportsbooks */}
        <section>
          <h2 className="section-title">
            Top {sportsbooks.length} Sportsbooks in {state.name}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sportsbooks.map((sb, i) => (
              <OperatorCard
                key={sb.slug}
                type="sportsbook"
                name={sb.name}
                slug={sb.slug}
                rank={i + 1}
                welcomeBonus={sb.welcomeBonus}
                tier={sb.tier}
                uniqueFeature={sb.reviewHighlights.split(".")[0]}
                affiliateWarning={sb.affiliateWarning}
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
                  <th>Sportsbook</th>
                  <th>Welcome Bonus</th>
                  <th>iOS Rating</th>
                  <th>Withdrawal</th>
                  <th>Loyalty</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sportsbooks.map((sb) => (
                  <tr key={sb.slug}>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                      {sb.name}
                    </td>
                    <td>{sb.welcomeBonus}</td>
                    <td>{sb.appRatingIos} ★</td>
                    <td>{sb.withdrawalSpeed}</td>
                    <td>{sb.loyaltyProgram ?? "—"}</td>
                    <td>
                      <Link
                        href={`/sportsbooks/${sb.slug}/`}
                        style={{
                          color: "var(--green)",
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

        {/* How to choose */}
        <article style={{ maxWidth: "680px" }}>
          <h2 className="section-title">
            How to Choose the Best Sportsbook in {state.name}
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            All {sportsbooks.length} sportsbooks operating in {state.name} are licensed and
            regulated by the {state.regulatoryBody}. Your deposits and winnings are
            protected under state law. That said, there are meaningful differences between apps.
          </p>
          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Welcome Bonus Value
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            New player bonuses range from free bet credits to deposit matches. Read the terms
            carefully — particularly the wagering requirements and minimum odds restrictions.
            A "Bet $5, Get $200" offer is often more valuable than a "$1,000 First Bet" offer
            with complex conditions.
          </p>
          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            Odds Quality
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Odds can vary significantly between sportsbooks on the same game. Having accounts at
            multiple books and checking odds before placing every bet is the single biggest
            advantage recreational bettors have. Even 10 extra cents on the line (-110 vs -120)
            compounds significantly over a betting season.
          </p>
          <h3
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "1.5rem 0 0.75rem",
            }}
          >
            App Reliability
          </h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Live betting is time-sensitive — app crashes or slowdowns cost money. DraftKings
            and FanDuel consistently lead in app ratings. Check the iOS App Store and Google
            Play Store ratings for the most current user feedback.
          </p>
        </article>

        <FAQSection faqs={faqs} title={`${state.name} Sportsbook FAQ`} />

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
          <Link href="/sportsbooks/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            All Sportsbook Reviews
          </Link>
        </div>
      </div>
    </>
  );
}
