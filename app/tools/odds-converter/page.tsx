import type { Metadata } from "next";
import Link from "next/link";
import OddsConverter from "./OddsConverter";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Odds Converter — American, Decimal, Fractional Calculator",
  description:
    "Free odds converter: instantly convert between American (+150), Decimal (2.50), and Fractional (3/2) odds. Includes implied probability and payout reference table.",
};

const faqs = [
  {
    q: "How do I convert American odds to Decimal?",
    a: "For positive American odds (+150): divide by 100 and add 1. So +150 = 1.5 + 1 = 2.50. For negative American odds (-110): divide 100 by the absolute value and add 1. So -110 = 100/110 + 1 = 1.909.",
  },
  {
    q: "What does implied probability mean?",
    a: "Implied probability is the win percentage implied by the odds. For decimal odds of 2.50, the implied probability is 1/2.50 = 40%. Sportsbooks add a margin (vig), so the total implied probability across both sides of a bet exceeds 100%. At -110/-110, the total implied probability is ~104.8%, meaning the book's margin is 4.8%.",
  },
  {
    q: "What are American odds?",
    a: "American odds (also called moneyline odds) are used by US sportsbooks. Positive odds (+150) show how much profit you win on a $100 bet. Negative odds (-110) show how much you must bet to win $100 profit. So +200 means bet $100, win $200. -200 means bet $200 to win $100.",
  },
  {
    q: "What are decimal odds?",
    a: "Decimal odds are common in Europe, Canada, and Australia. They show the total return on a $1 stake including your original bet. Decimal 2.50 means a $1 bet returns $2.50 total (so $1.50 profit). To calculate profit: (decimal × stake) - stake.",
  },
  {
    q: "What are fractional odds?",
    a: "Fractional odds are traditional in UK horse racing. They show profit relative to stake. 3/2 means for every $2 you bet, you win $3 profit. 11/10 (common horse racing odds) means for every $10 you bet, you win $11. To convert to profit: (numerator/denominator) × stake.",
  },
];

export default function OddsConverterPage() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools/" },
              { label: "Odds Converter" },
            ]}
          />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
            🔄 Odds Converter
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0 }}>
            Convert between American, Decimal, and Fractional odds instantly. Includes implied probability and $100 payout.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="card">
          <OddsConverter />
        </div>

        <div className="highlight-box">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Shop odds across sportsbooks</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                Even slight odds differences (+100 vs -110) dramatically impact long-term profits. Compare now.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/sportsbooks/" className="btn-primary">Compare Sportsbooks →</Link>
            </div>
          </div>
        </div>

        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">Understanding Betting Odds</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Odds represent the relationship between the payout and the probability that a sportsbook assigns to an event. There are three major formats: American (moneyline), Decimal, and Fractional — and all three express the same information, just differently.
          </p>
          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>The Vig (House Edge)</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Sportsbooks don't offer true odds — they add a margin called the vig or juice. At -110 on both sides, the implied probabilities sum to 104.8% (52.4% + 52.4%), meaning the book expects to keep 4.8% of all money wagered. This is why shopping for the best odds matters: getting +100 instead of -110 on a 50/50 bet eliminates the vig entirely.
          </p>
          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Why Odds Shopping Matters</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Over 1,000 bets at -110 vs +100 on the same 50/50 markets: at -110 you'd expect to lose ~$4,800 due to vig. At +100 you'd break even. This is why serious bettors use 3-5 different sportsbook accounts to always get the best available price.
          </p>
        </article>

        <FAQSection faqs={faqs} />

        <section>
          <h2 className="section-title">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", icon: "🎯" },
              { name: "Betting Calculator", href: "/tools/betting-calculator/", icon: "💰" },
              { name: "EV Calculator", href: "/tools/ev-calculator/", icon: "📊" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="card card-hover" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t.icon}</div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
