import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ToolIcon from "@/components/ToolIcon";

export const metadata: Metadata = {
  title: "Free Betting Tools — Parlay Calculator, Odds Converter & More",
  description: "Free online betting tools: parlay calculator, odds converter, betting calculator, and EV calculator. No signup required. Used by thousands of sports bettors.",
};

const tools: Array<{
  name: string;
  slug: string;
  icon: "parlay" | "odds" | "betting" | "ev";
  desc: string;
  searches: string;
  features: string[];
}> = [
  {
    name: "Parlay Calculator",
    slug: "parlay-calculator",
    icon: "parlay",
    desc: "Add up to 12 parlay legs. Instantly calculates total odds, potential payout, profit, and combined win probability. The most-used tool on this site.",
    searches: "246,000/mo",
    features: ["Up to 12 legs", "Real-time calculation", "Win probability", "Leg-by-leg breakdown"],
  },
  {
    name: "Odds Converter",
    slug: "odds-converter",
    icon: "odds",
    desc: "Convert between American (+150), Decimal (2.50), and Fractional (3/2) odds instantly. Includes implied probability and a full reference table of common odds.",
    searches: "90,000/mo",
    features: ["All 3 formats", "Implied probability", "Reference table", "Instant conversion"],
  },
  {
    name: "Betting Calculator",
    slug: "betting-calculator",
    icon: "betting",
    desc: "Enter your stake and odds to see exact potential payout and profit. Supports American, Decimal, and Fractional odds. Simple and fast.",
    searches: "110,000/mo",
    features: ["All odds formats", "Payout & profit", "Implied probability", "Instant results"],
  },
  {
    name: "EV Calculator",
    slug: "ev-calculator",
    icon: "ev",
    desc: "Calculate the expected value of any bet. Input your estimated win probability and the sportsbook's odds to see if you have a mathematical edge (+EV or -EV).",
    searches: "14,000/mo",
    features: ["EV calculation", "Edge percentage", "+EV / -EV verdict", "Long-term projections"],
  },
];

export default function ToolsPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)", borderBottom: "1px solid var(--border)", padding: "2.5rem 1.5rem 2rem" }}>
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Betting Tools" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
            Free Sports Betting Tools
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0 }}>
            Professional-grade betting calculators. No signup, no ads, completely free.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}/`} style={{ textDecoration: "none" }}>
              <div className="card card-hover" style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "0.75rem",
                      background: "rgba(0,255,135,0.08)",
                      border: "1px solid rgba(0,255,135,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--green)",
                      flexShrink: 0,
                    }}
                  >
                    <ToolIcon tool={tool.icon} size={26} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <h2 style={{ fontWeight: 800, fontSize: "1.125rem", color: "var(--text-primary)", margin: 0 }}>{tool.name}</h2>
                      <span style={{ padding: "2px 8px", background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)", borderRadius: "9999px", color: "var(--green)", fontSize: "0.7rem", fontWeight: 700 }}>
                        {tool.searches} searches
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: "1.6", margin: "0 0 1rem" }}>{tool.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {tool.features.map((f) => (
                    <span key={f} style={{ padding: "0.2rem 0.625rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
