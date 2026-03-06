import type { Metadata } from "next";
import Link from "next/link";
import EVCalc from "./EVCalc";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import ToolIcon from "@/components/ToolIcon";

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
            Expected Value (EV) Calculator
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

        {/* How to use the EV calculator */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">How to Use Our EV Calculator</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1.25rem" }}>
            Our EV calculator tells you whether a bet has a mathematical edge over the sportsbook. Enter the odds and your estimated win probability — the calculator instantly shows if the bet is +EV or -EV and by how much.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {([
              { step: 1, title: "Enter the sportsbook's odds", desc: "Type in the American odds offered by the sportsbook — e.g., +150 for an underdog, -110 for a standard spread, +330 for a big underdog moneyline." },
              { step: 2, title: "Enter your estimated win probability", desc: "This is your own assessment of how likely the team is to win — expressed as a percentage. For example, if you think a team has a 45% chance of winning, enter 45." },
              { step: 3, title: "Enter your stake", desc: "How much you plan to bet. The EV calculator shows absolute expected value in dollars (not just percentages), so you can see your real expected profit per bet." },
              { step: 4, title: "Read the EV result", desc: "Positive EV (+$X) means your edge over the book — you expect to profit that amount per bet on average over time. Negative EV means the bet loses money long-term. Only bet +EV situations." },
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

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>EV Calculator Examples</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {([
              { label: "+EV Example", odds: "+150", prob: "45%", stake: "$100", ev: "+$12.50", color: "var(--green)", desc: "Book implies 40% win prob. Your model says 45%. That 5% edge = $12.50 expected profit per $100 bet." },
              { label: "-EV Example", odds: "-110", prob: "48%", stake: "$100", ev: "−$3.27", color: "#ef4444", desc: "Book implies 52.4% win prob. You estimate 48%. You're below the break-even line — skip this bet." },
            ] as { label: string; odds: string; prob: string; stake: string; ev: string; color: string; desc: string }[]).map(({ label, odds, prob, stake, ev, color, desc }) => (
              <div key={label} className="card" style={{ padding: "1rem" }}>
                <div style={{ fontWeight: 700, color, marginBottom: "0.5rem", fontSize: "0.875rem" }}>{label}</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
                  {[["Odds", odds], ["Win%", prob], ["Stake", stake], ["EV", ev]].map(([k, v]) => (
                    <div key={k} style={{ padding: "2px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", fontSize: "0.75rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>{k}: </span>
                      <span style={{ color: k === "EV" ? color : "var(--text-primary)", fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: "1.5", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>How to Find +EV Bets</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Finding +EV bets requires having a more accurate win probability estimate than the sportsbook. Here are the methods sharp bettors use:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: "2", paddingLeft: "1.25rem", marginBottom: "1.25rem" }}>
            <li><strong style={{ color: "var(--text-primary)" }}>Line Shopping:</strong> Compare the same game across 4–5 sportsbooks. If FanDuel offers +115 and DraftKings offers +100 on the same side, FanDuel is +EV relative to the consensus.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>No-vig Fair Odds:</strong> Remove the vig from both sides of a market to get the true implied probability. If the no-vig line is -105 and a book offers +100, that&apos;s +EV.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Sharp Line Movement:</strong> When a line moves from -3 to -4.5, it usually means sharp money landed on the favorite. Following sharp moves is a proven +EV strategy.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Statistical Models:</strong> Build or use existing win probability models based on team performance, pace, injuries, and matchup data. If your model consistently diverges from the market line, exploit the difference.</li>
          </ul>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Kelly Criterion — How Much to Bet on +EV Plays</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Once you find a +EV bet, the Kelly Criterion tells you the optimal stake size to maximize bankroll growth. The formula:
          </p>
          <div className="card" style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "var(--green)", marginBottom: "1rem", padding: "1rem" }}>
            <div>Kelly % = (Win Prob × Decimal Odds − 1) ÷ (Decimal Odds − 1)</div>
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.5rem", paddingTop: "0.5rem", color: "var(--gold)" }}>
              Example: +150 odds (2.50 decimal), 45% win prob → (0.45 × 2.50 − 1) ÷ (2.50 − 1) = 0.125/1.5 = 8.3% of bankroll
            </div>
          </div>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Most professional bettors use Half Kelly (4.15% in the above example) to reduce variance. Never bet more than the full Kelly amount — it maximizes long-run growth but the swings can be brutal. Use the EV calculator to confirm you have edge before sizing any bet.
          </p>
        </article>

        <FAQSection faqs={faqs} />
        <section>
          <h2 className="section-title">More Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Parlay Calculator", href: "/tools/parlay-calculator/", tool: "parlay" as const },
              { name: "Odds Converter", href: "/tools/odds-converter/", tool: "odds" as const },
              { name: "Betting Calculator", href: "/tools/betting-calculator/", tool: "betting" as const },
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
