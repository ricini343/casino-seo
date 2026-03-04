import type { Metadata } from "next";
import Link from "next/link";
import EVCalc from "./EVCalc";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Expected Value (EV) Calculator for Sports Betting",
  description:
    "Free EV calculator: find positive expected value bets. Input odds and your estimated win probability to instantly calculate +EV or -EV. Beat the sportsbooks.",
};

const faqs = [
  {
    q: "What is Expected Value (EV) in sports betting?",
    a: "Expected Value (EV) measures the average profit or loss you'd expect per bet over the long run. A +EV bet means you have a mathematical edge over the sportsbook — your estimated win probability is higher than the book's implied probability. -EV bets have a negative expected long-term return. Sharp bettors focus exclusively on +EV bets.",
  },
  {
    q: "How do I calculate Expected Value?",
    a: "EV = (Win Probability × Profit if Win) - (Lose Probability × Stake). Example: +150 odds, 45% win probability, $100 stake. EV = (0.45 × $150) - (0.55 × $100) = $67.50 - $55 = +$12.50. This means you'd expect to profit $12.50 per bet on average.",
  },
  {
    q: "How do I estimate my win probability?",
    a: "Estimating win probability is the hard part. Methods include: analyzing historical data and team stats, using advanced models (regression, machine learning), comparing lines across multiple sportsbooks (line movement indicates sharp money), and applying sports analytics databases. The more accurate your estimate, the better your EV calculations.",
  },
  {
    q: "What is a good edge in sports betting?",
    a: "Professional sports bettors typically operate with edges of 1-5%. A 3% edge on -110 lines means your true win probability is ~55.4% vs the book's implied 52.4%. Over hundreds of bets, this edge compounds into significant profits. Edges above 10% are rare and often indicate model errors rather than true advantages.",
  },
];

export default function EVCalculatorPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)", borderBottom: "1px solid var(--border)", padding: "2.5rem 1.5rem 2rem" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools/" }, { label: "EV Calculator" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
            📊 Expected Value (EV) Calculator
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0 }}>
            Find positive expected value bets. Input the odds and your win probability estimate to see if a bet has mathematical edge.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="card"><EVCalc /></div>
        <div className="highlight-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Get the best odds available</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>Having accounts at multiple sportsbooks maximizes your chance of finding +EV lines.</p>
            </div>
            <Link href="/sportsbooks/" className="btn-primary">Top Sportsbooks →</Link>
          </div>
        </div>
        <FAQSection faqs={faqs} />
        <section>
          <h2 className="section-title">More Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", icon: "🎯" },
              { name: "Odds Converter", href: "/tools/odds-converter/", icon: "🔄" },
              { name: "Betting Calculator", href: "/tools/betting-calculator/", icon: "💰" },
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
