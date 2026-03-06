import type { Metadata } from "next";
import Link from "next/link";
import OddsConverter from "./OddsConverter";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import ToolIcon from "@/components/ToolIcon";

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
            Odds Converter
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

        {/* How to use the odds converter */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">How to Use Our Odds Converter</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1.25rem" }}>
            Our free odds converter works in all directions — paste any odds format and instantly get all three equivalents plus the implied probability. No math required.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.25rem" }}>
            {([
              { step: 1, title: "Enter your odds in any format", desc: "Type American odds (e.g., -110 or +150), Decimal odds (e.g., 1.909 or 2.50), or Fractional odds (e.g., 10/11 or 3/2) into the corresponding field." },
              { step: 2, title: "Read all converted values instantly", desc: "The converter immediately shows the equivalent American, Decimal, and Fractional odds side by side — plus the implied win probability for those odds." },
              { step: 3, title: "Use the implied probability to find value", desc: "If your own estimate of a team's win probability is higher than the implied probability shown, the bet may have positive expected value (+EV). That's the edge sharp bettors look for." },
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
        </article>

        {/* Understanding odds article */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">Understanding Betting Odds</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Odds represent the relationship between the payout and the probability that a sportsbook assigns to an event. There are three major formats: American (moneyline), Decimal, and Fractional — and all three express the same information, just differently.
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Odds Conversion Quick Reference</h3>
          <div style={{ overflowX: "auto", marginBottom: "1.25rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>American</th>
                  <th>Decimal</th>
                  <th>Fractional</th>
                  <th>Implied Probability</th>
                  <th>$100 Payout</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { am: "-400", dec: "1.25", frac: "1/4", prob: "80.0%", pay: "$125" },
                  { am: "-200", dec: "1.50", frac: "1/2", prob: "66.7%", pay: "$150" },
                  { am: "-150", dec: "1.67", frac: "2/3", prob: "60.0%", pay: "$167" },
                  { am: "-110", dec: "1.91", frac: "10/11", prob: "52.4%", pay: "$191" },
                  { am: "+100", dec: "2.00", frac: "1/1", prob: "50.0%", pay: "$200" },
                  { am: "+110", dec: "2.10", frac: "11/10", prob: "47.6%", pay: "$210" },
                  { am: "+150", dec: "2.50", frac: "3/2", prob: "40.0%", pay: "$250" },
                  { am: "+200", dec: "3.00", frac: "2/1", prob: "33.3%", pay: "$300" },
                  { am: "+400", dec: "5.00", frac: "4/1", prob: "20.0%", pay: "$500" },
                ].map((row) => (
                  <tr key={row.am}>
                    <td style={{ fontWeight: 700, color: Number(row.am) > 0 ? "var(--green)" : "var(--gold)" }}>{row.am}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{row.dec}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{row.frac}</td>
                    <td style={{ color: "var(--text-muted)" }}>{row.prob}</td>
                    <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{row.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Which Odds Format Should You Use?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {([
              { format: "American", used: "US sportsbooks", best: "DraftKings, FanDuel, BetMGM, Caesars — standard in the US for all sports markets." },
              { format: "Decimal", used: "Europe, Canada, Australia", best: "Easier for parlay math — multiply all decimals together to get total parlay odds instantly." },
              { format: "Fractional", used: "UK horse racing", best: "Traditional format. Profit/stake ratio. 5/1 means $5 profit per $1 staked." },
            ] as { format: string; used: string; best: string }[]).map(({ format, used, best }) => (
              <div key={format} className="card" style={{ padding: "1rem" }}>
                <div style={{ fontWeight: 700, color: "var(--green)", marginBottom: "0.25rem", fontSize: "0.875rem" }}>{format}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginBottom: "0.375rem", fontWeight: 600, textTransform: "uppercase" }}>{used}</div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: "1.5", margin: 0 }}>{best}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>The Vig (House Edge)</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Sportsbooks don't offer true odds — they add a margin called the vig or juice. At -110 on both sides, the implied probabilities sum to 104.8% (52.4% + 52.4%), meaning the book expects to keep 4.8% of all money wagered. This is why shopping for the best odds matters: getting +100 instead of -110 on a 50/50 bet eliminates the vig entirely.
          </p>
          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Why Odds Shopping Matters</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Over 1,000 bets at -110 vs +100 on the same 50/50 markets: at -110 you'd expect to lose ~$4,800 due to vig. At +100 you'd break even. This is why serious bettors use 3–5 different sportsbook accounts to always get the best available price. Use our odds converter to compare lines across books before locking in any bet.
          </p>
        </article>

        <FAQSection faqs={faqs} />

        <section>
          <h2 className="section-title">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", tool: "parlay" as const },
              { name: "Betting Calculator", href: "/tools/betting-calculator/", tool: "betting" as const },
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
