import type { Metadata } from "next";
import Link from "next/link";
import ParlayCalc from "./ParlayCalc";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSection from "@/components/FAQSection";
import { SITE } from "@/site.config";
import ToolIcon from "@/components/ToolIcon";

export const metadata: Metadata = {
  title: "Parlay Calculator — Calculate Parlay Odds & Payouts Free",
  description:
    "Free parlay calculator: instantly calculate parlay odds, potential payouts, and win probability. Add up to 12 legs. Supports American odds. No signup needed.",
  openGraph: {
    title: "Free Parlay Calculator — Calculate Multi-Leg Bet Payouts",
    description: "Add your parlay legs and instantly see total odds, potential payout, and win probability. Free tool, no signup required.",
  },
};

const faqs = [
  {
    q: "What is a parlay bet?",
    a: "A parlay combines two or more individual bets into a single wager. To win, all legs of the parlay must win. While parlays are harder to win, they offer significantly larger payouts since each leg's odds are multiplied together. For example, a 4-team parlay at -110 on each leg pays out at approximately +1228 odds.",
  },
  {
    q: "How does the parlay calculator work?",
    a: "Enter the American odds for each leg (e.g., +150, -110, +200) and your stake amount. The calculator multiplies all the decimal equivalents together to get the total parlay odds, then multiplies that by your stake to show the potential payout and profit. It also calculates the combined win probability by multiplying the individual implied probabilities.",
  },
  {
    q: "What are American odds?",
    a: "American odds show how much you'd win on a $100 bet. Positive odds (+150) show your profit on a $100 bet — so +150 means a $100 bet wins $150 profit. Negative odds (-110) show how much you need to bet to win $100 — so -110 means you need to bet $110 to win $100 profit.",
  },
  {
    q: "How many legs can I add to a parlay?",
    a: "Most sportsbooks allow 2 to 12 legs in a parlay. Some allow more with correlated parlay builders (same-game parlays). This calculator supports up to 12 legs. Note that the more legs you add, the lower your probability of winning, even if the potential payout grows.",
  },
  {
    q: "What is a same-game parlay (SGP)?",
    a: "A same-game parlay (SGP) allows you to combine multiple bets from the same sporting event — like player props, point spreads, and totals from the same NFL game. DraftKings and FanDuel are known for their SGP+ products. Note that SGP legs may be correlated, which reduces potential payouts compared to standard parlays.",
  },
  {
    q: "What is the typical parlay payout for a 2-team parlay at -110?",
    a: "A 2-team parlay where both legs are -110 pays out at approximately +260 (2.60 decimal odds), meaning a $100 bet returns $360 total ($260 profit). A 3-team same-odds parlay pays roughly +596. Each additional -110 leg roughly doubles the odds, though vig reduces the exact payout below the theoretical maximum.",
  },
  {
    q: "Are parlays good bets?",
    a: "Parlays are entertaining and can deliver life-changing payouts, but they are mathematically unfavorable due to the vig (house edge) compounding across each leg. Each -110 leg has roughly 52.4% implied probability, but only a 47.6% true win probability at fair odds. As you add legs, the gap between expected value and payout grows. That said, parlay insurance promos at DraftKings and FanDuel can provide good value.",
  },
];

export default function ParlayCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Parlay Calculator",
    description: "Free online parlay calculator — calculate parlay odds and payouts from American odds",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
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
              { label: "Parlay Calculator" },
            ]}
          />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
                Parlay Calculator
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0, lineHeight: "1.6" }}>
                Calculate parlay odds, payouts & win probability. Add up to 12 legs. Free, no signup.
              </p>
            </div>
            <div
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(0,255,135,0.1)",
                border: "1px solid rgba(0,255,135,0.25)",
                borderRadius: "0.5rem",
                color: "var(--green)",
                fontSize: "0.875rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              246K searches/mo
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Calculator */}
        <div className="card">
          <ParlayCalc />
        </div>

        {/* Affiliate CTA */}
        <div className="highlight-box">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.375rem" }}>
                Ready to place your parlay?
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                DraftKings has the best Same Game Parlay+ builder in the US, with live odds for all major sports.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/go/draftkings/" className="btn-primary" rel="nofollow sponsored">
                Bet on DraftKings →
              </Link>
              <Link href="/go/fanduel/" className="btn-outline" rel="nofollow sponsored">
                Try FanDuel
              </Link>
            </div>
          </div>
        </div>

        {/* How to use the parlay calculator — SEO content */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">How to Use Our Free Parlay Calculator</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1.25rem" }}>
            Our parlay calculator works for any combination of American odds — point spreads, moneylines, totals, and props. Enter your legs, set your stake, and get instant parlay odds and payout. No account needed.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.25rem" }}>
            {([
              { step: 1, title: "Enter your first leg's odds", desc: "Type the American odds for your first pick (e.g., -110 for a spread, +150 for an underdog moneyline). The parlay calculator accepts any valid American odds format." },
              { step: 2, title: 'Add more legs', desc: 'Click "Add Leg" for each additional pick. Our parlay calculator supports up to 12 legs — matching the maximum most US sportsbooks allow.' },
              { step: 3, title: "Set your wager amount", desc: "Enter how much you want to bet. The calculator updates your potential payout instantly as you type." },
              { step: 4, title: "Read your parlay results", desc: "See total parlay odds (American), exact payout in dollars, total profit, and the combined win probability across all legs." },
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
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            The parlay calculator converts each leg from American odds to decimal format, multiplies them together to get true parlay odds, then applies your stake to show the exact payout — including the sportsbook's house edge. Use it before locking in any multi-leg bet to know exactly what you stand to win.
          </p>
        </article>

        {/* What is a parlay — SEO content */}
        <article style={{ maxWidth: "720px" }}>
          <h2 className="section-title">What Is a Parlay Bet?</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            A parlay (also called an accumulator) is a single bet that links two or more individual wagers together. To win the parlay, every single leg must win. If even one leg loses, the entire parlay loses. In return for this increased risk, successful parlays pay out much more than individual bets would combined.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            For example: If you bet $100 on a 3-team parlay where each team is -110, and all three teams win, your payout would be approximately $596 — a profit of $496. If you had placed three separate $33 bets at -110 odds and all won, you'd profit only about $90 total.
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>How Parlay Odds Are Calculated</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Parlay odds are calculated by converting each leg's American odds to decimal format, then multiplying all the decimal values together. For example:
          </p>
          <div className="card" style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "var(--green)", marginBottom: "1rem" }}>
            <div>Leg 1: -110 → 1.909</div>
            <div>Leg 2: +150 → 2.500</div>
            <div>Leg 3: -120 → 1.833</div>
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.5rem", paddingTop: "0.5rem", color: "var(--gold)", fontWeight: 700 }}>
              Total: 1.909 × 2.500 × 1.833 = 8.74 (decimal) = +774 (American)
            </div>
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Parlay Payout Chart — Common Odds</h3>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table" style={{ marginBottom: "1rem" }}>
              <thead>
                <tr>
                  <th># Legs</th>
                  <th>All -110</th>
                  <th>All +100</th>
                  <th>All +150</th>
                  <th>Win Probability (all -110)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { legs: 2, minus110: "+260", plus100: "+300", plus150: "+525", prob: "27.3%" },
                  { legs: 3, minus110: "+596", plus100: "+700", plus150: "+1312", prob: "13.0%" },
                  { legs: 4, minus110: "+1228", plus100: "+1500", plus150: "+3281", prob: "6.2%" },
                  { legs: 5, minus110: "+2435", plus100: "+3100", plus150: "+8203", prob: "2.9%" },
                  { legs: 6, minus110: "+4713", plus100: "+6300", plus150: "+20508", prob: "1.4%" },
                ].map((row) => (
                  <tr key={row.legs}>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>{row.legs} Teams</td>
                    <td style={{ color: "var(--green)" }}>{row.minus110}</td>
                    <td style={{ color: "var(--gold)" }}>{row.plus100}</td>
                    <td style={{ color: "var(--gold)" }}>{row.plus150}</td>
                    <td style={{ color: "var(--text-muted)" }}>{row.prob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Types of Parlay Bets You Can Calculate</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {([
              { type: "Standard Parlay", desc: "Two or more picks from different games. Most common format — use this parlay calculator to price any mix of spreads, moneylines, and totals across any sport." },
              { type: "Same-Game Parlay (SGP)", desc: "Multiple picks from one game (props + spread + total). Available at DraftKings, FanDuel, and BetMGM. Correlation rules may cap payouts." },
              { type: "Round Robin Parlay", desc: "Generates all possible smaller parlays from your picks. A 4-team round robin of 2-teamers creates 6 separate parlays — more coverage if one leg loses." },
              { type: "Teaser Parlay", desc: "Move point spreads in your favor (typically 6 pts in NFL/NBA) in exchange for reduced parlay odds. A 2-team 6-point NFL teaser pays around -120 vs +260 standard." },
            ] as { type: string; desc: string }[]).map(({ type, desc }) => (
              <div key={type} className="card" style={{ padding: "1rem" }}>
                <div style={{ fontWeight: 700, color: "var(--green)", marginBottom: "0.375rem", fontSize: "0.875rem" }}>{type}</div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: "1.6", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Best Parlay Promos Available</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            Most major sportsbooks now offer parlay-specific promotions to boost your winnings or protect against near-misses:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: "2", paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            <li><strong style={{ color: "var(--text-primary)" }}>Parlay Insurance:</strong> If one leg loses by a field goal or less, get a refund</li>
            <li><strong style={{ color: "var(--text-primary)" }}>SGP Boosts:</strong> DraftKings and FanDuel regularly offer enhanced SGP odds</li>
            <li><strong style={{ color: "var(--text-primary)" }}>Parlay Loyalty:</strong> BetMGM's M life Rewards points on parlay wagers</li>
            <li><strong style={{ color: "var(--text-primary)" }}>One Leg Miss:</strong> Caesars often runs promos where missing 1 leg still pays out</li>
          </ul>
        </article>

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* Related Tools */}
        <section>
          <h2 className="section-title">Related Betting Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Odds Converter", href: "/tools/odds-converter/", tool: "odds" as const, desc: "Convert American, Decimal, Fractional odds" },
              { name: "Betting Calculator", href: "/tools/betting-calculator/", tool: "betting" as const, desc: "Calculate payout from any single bet" },
              { name: "EV Calculator", href: "/tools/ev-calculator/", tool: "ev" as const, desc: "Find positive expected value bets" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="card card-hover" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ color: "var(--green)", marginBottom: "0.5rem" }}><ToolIcon tool={t.tool} size={28} /></div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{t.name}</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
