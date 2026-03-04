import type { Metadata } from "next";
import Link from "next/link";
import BettingCalc from "./BettingCalc";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Betting Calculator — Calculate Potential Payout & Profit",
  description:
    "Free betting calculator: enter your stake and odds to see exact payout and profit. Supports American, Decimal, and Fractional odds. Instant results.",
};

const faqs = [
  {
    q: "How do I calculate potential winnings from a bet?",
    a: "To calculate your potential winnings: convert your odds to decimal format, then multiply by your stake. For American -110 odds: decimal = 100/110 + 1 = 1.909. $100 × 1.909 = $190.90 total return ($90.90 profit). Our calculator does this instantly for all odds formats.",
  },
  {
    q: "What is the difference between payout and profit?",
    a: "Payout (total return) is the total amount returned to you including your original stake. Profit (winnings) is just the amount you gained above your stake. If you bet $100 at -110 and win, you get $190.90 payout. Your profit is $90.90. The difference is your original $100 stake.",
  },
  {
    q: "What does -110 mean in sports betting?",
    a: "-110 is the standard vig line in American sports betting. It means you need to bet $110 to win $100 profit. So a $100 bet at -110 returns $190.91 total ($90.91 profit). This is the sportsbook's built-in margin — they collect about 4.5% on every -110/-110 market.",
  },
];

export default function BettingCalculatorPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)", borderBottom: "1px solid var(--border)", padding: "2.5rem 1.5rem 2rem" }}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools/" }, { label: "Betting Calculator" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
            💰 Betting Calculator
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0 }}>
            Enter stake and odds to see exact payout, profit, and implied probability. All formats supported.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="card"><BettingCalc /></div>
        <div className="highlight-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Find the best odds for your bet</div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>Compare all major US sportsbooks and get the highest payout on every wager.</p>
            </div>
            <Link href="/sportsbooks/" className="btn-primary">Compare Odds →</Link>
          </div>
        </div>
        <FAQSection faqs={faqs} />
        <section>
          <h2 className="section-title">More Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", icon: "🎯" },
              { name: "Odds Converter", href: "/tools/odds-converter/", icon: "🔄" },
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
