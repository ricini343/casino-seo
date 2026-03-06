import type { Metadata } from "next";
import Link from "next/link";
import BettingCalc from "./BettingCalc";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import ToolIcon from "@/components/ToolIcon";

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
            Betting Calculator
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

        {/* How to use section */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">How to Use Our Betting Calculator</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1.25rem" }}>
            Our betting calculator works with American, Decimal, and Fractional odds. Enter your stake and odds to get the exact payout and profit in seconds — no mental math needed.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {([
              { step: 1, title: "Select your odds format", desc: "Choose American (e.g., -110 or +150), Decimal (e.g., 1.91), or Fractional (e.g., 10/11). American is the default at all major US sportsbooks." },
              { step: 2, title: "Enter the odds", desc: "Type in the exact odds shown on your sportsbook's bet slip. For American odds, include the sign (+ or -). Negative means favorite, positive means underdog." },
              { step: 3, title: "Enter your stake", desc: "Type the dollar amount you want to bet. The betting calculator instantly updates your potential payout and net profit." },
              { step: 4, title: "Compare before you bet", desc: "Run the same bet with odds from two different sportsbooks to see exactly how much more you'd win by line shopping. Even +5 to +10 cents difference adds up significantly over time." },
            ] as { step: number; title: string; desc: string }[]).map(({ step, title, desc }) => (
              <div key={step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #00FF87, #FFD700)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 900, color: "#0a0e1a",
                }}>{step}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>{title}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Common Bet Payouts — Quick Reference</h3>
          <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Stake</th>
                  <th>-110 Payout</th>
                  <th>-110 Profit</th>
                  <th>+150 Payout</th>
                  <th>+150 Profit</th>
                  <th>+200 Payout</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stake: "$10",   p110: "$19.09",  r110: "$9.09",  p150: "$25.00",  r150: "$15.00",  p200: "$30.00" },
                  { stake: "$25",   p110: "$47.73",  r110: "$22.73", p150: "$62.50",  r150: "$37.50",  p200: "$75.00" },
                  { stake: "$50",   p110: "$95.45",  r110: "$45.45", p150: "$125.00", r150: "$75.00",  p200: "$150.00" },
                  { stake: "$100",  p110: "$190.91", r110: "$90.91", p150: "$250.00", r150: "$150.00", p200: "$300.00" },
                  { stake: "$500",  p110: "$954.55", r110: "$454.55",p150: "$1,250",  r150: "$750.00", p200: "$1,500" },
                ].map((row) => (
                  <tr key={row.stake}>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>{row.stake}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{row.p110}</td>
                    <td style={{ color: "var(--green)" }}>{row.r110}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{row.p150}</td>
                    <td style={{ color: "var(--green)" }}>{row.r150}</td>
                    <td style={{ color: "var(--gold)" }}>{row.p200}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>What Is a Betting Calculator Used For?</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            A betting calculator helps you understand the exact financial outcome of a wager before you place it. Rather than guessing, you can verify the payout, compare two different sportsbooks' prices on the same game, and decide whether the potential return is worth the risk.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Most US sportsbooks display American odds by default. If you see -110 on a point spread, a betting calculator instantly tells you: a $110 bet returns $200 total ($90.91 profit). If you see +350 on a moneyline underdog, the calculator shows: a $100 bet returns $450 total ($350 profit).
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Payout vs Profit — What's the Difference?</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Payout</strong> is the total amount returned to your account including your original stake. <strong style={{ color: "var(--text-primary)" }}>Profit</strong> is only what you gained above your stake. For a $100 bet at -110 that wins: your payout is $190.91, your profit is $90.91. The sportsbook returns your $100 stake plus $90.91 winnings.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Our betting calculator displays both figures clearly. Always check the profit number (not just payout) when comparing bets — it gives you the true picture of what you stand to gain relative to your risk.
          </p>
        </article>

        <FAQSection faqs={faqs} />
        <section>
          <h2 className="section-title">More Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", tool: "parlay" as const },
              { name: "Odds Converter", href: "/tools/odds-converter/", tool: "odds" as const },
              { name: "EV Calculator", href: "/tools/ev-calculator/", tool: "ev" as const },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="card card-hover" style={{ textDecoration: "none" }}>
                <div style={{ color: "var(--green)", marginBottom: "0.5rem" }}><ToolIcon tool={t.tool} size={28} /></div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
