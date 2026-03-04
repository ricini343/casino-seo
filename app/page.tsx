import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site.config";
import { states, sportsbooks, casinos, getStatesByRegion } from "@/lib/data";
import OperatorCard from "@/components/OperatorCard";
import LegalStatusBadge from "@/components/LegalStatusBadge";

export const metadata: Metadata = {
  title: `${SITE.name} — Best Legal Online Casinos & Sportsbooks by State`,
  description:
    "Compare the best legal online casinos and sportsbooks in every US state. Expert reviews, exclusive bonuses, state-by-state gambling guides. Updated for 2026.",
};

export default function HomePage() {
  const topSportsbooks = sportsbooks.filter((s) => s.tier === "tier1").slice(0, 4);
  const topCasinos = casinos.filter((c) => c.tier === "tier1").slice(0, 4);
  const legalStates = states.filter((s) => s.onlineSportsbookLegal || s.onlineCasinoLegal);
  const regionGroups = getStatesByRegion();

  const tools = [
    { name: "Parlay Calculator", slug: "parlay-calculator", icon: "🎯", desc: "Calculate parlay odds and payouts instantly", msv: "246K/mo" },
    { name: "Odds Converter", slug: "odds-converter", icon: "🔄", desc: "Convert American, Decimal, and Fractional odds", msv: "90K/mo" },
    { name: "Betting Calculator", slug: "betting-calculator", icon: "💰", desc: "Calculate potential payout from any bet", msv: "110K/mo" },
    { name: "EV Calculator", slug: "ev-calculator", icon: "📊", desc: "Find positive expected value bets", msv: "14K/mo" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 60%, #0a0e1a 100%)",
          padding: "5rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(0,255,135,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-5xl mx-auto text-center" style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              background: "rgba(0,255,135,0.1)",
              border: "1px solid rgba(0,255,135,0.25)",
              borderRadius: "9999px",
              color: "var(--green)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            🇺🇸 {legalStates.length} States with Legal Online Gambling — Updated {SITE.currentYear}
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-1px",
            }}
          >
            Find the Best Legal<br />
            <span style={{ color: "var(--green)" }}>Online Gambling</span> in Your State
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: "1.7",
            }}
          >
            Compare licensed casinos and sportsbooks, claim exclusive bonuses, and use our free betting tools. All operators are verified legal in your state.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/states/" className="btn-primary">
              Find My State →
            </Link>
            <Link href="/tools/parlay-calculator/" className="btn-outline">
              🎯 Parlay Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          background: "rgba(0,255,135,0.05)",
          borderTop: "1px solid rgba(0,255,135,0.15)",
          borderBottom: "1px solid rgba(0,255,135,0.15)",
          padding: "1rem 1.5rem",
        }}
      >
        <div className="max-w-5xl mx-auto" style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Legal States", value: legalStates.length.toString() },
            { label: "Operators Reviewed", value: `${sportsbooks.length + casinos.length}+` },
            { label: "Bonuses Tracked", value: `${(sportsbooks.length + casinos.length) * 2}+` },
            { label: "Free Tools", value: "4" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "1.5rem", color: "var(--green)" }}>{stat.value}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Top Sportsbooks */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h2 className="section-title">Best Sportsbooks {SITE.currentYear}</h2>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>Top-rated legal US sports betting apps</p>
            </div>
            <Link href="/sportsbooks/" style={{ color: "var(--green)", fontSize: "0.875rem", fontWeight: 600 }}>
              View all sportsbooks →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSportsbooks.map((sb, i) => (
              <OperatorCard
                key={sb.slug}
                name={sb.name}
                slug={sb.slug}
                type="sportsbook"
                welcomeBonus={sb.welcomeBonus}
                tier={sb.tier}
                uniqueFeature={sb.uniqueFeatures[0]}
                rank={i + 1}
              />
            ))}
          </div>
        </section>

        {/* Top Casinos */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h2 className="section-title">Best Online Casinos {SITE.currentYear}</h2>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>Highest-rated licensed online casino apps</p>
            </div>
            <Link href="/casinos/" style={{ color: "var(--green)", fontSize: "0.875rem", fontWeight: 600 }}>
              View all casinos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCasinos.map((c, i) => (
              <OperatorCard
                key={c.slug}
                name={c.name}
                slug={c.slug}
                type="casino"
                welcomeBonus={c.welcomeBonus}
                tier={c.tier}
                uniqueFeature={c.reviewHighlights.split(".")[0]}
                rank={i + 1}
              />
            ))}
          </div>
        </section>

        {/* Free Tools */}
        <section>
          <h2 className="section-title">Free Betting Tools</h2>
          <p className="section-subtitle">Calculate odds, find value bets, and make smarter wagers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                style={{ textDecoration: "none" }}
              >
                <div className="card card-hover" style={{ height: "100%" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{tool.icon}</div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {tool.name}
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0 0 0.75rem", lineHeight: "1.5" }}>
                    {tool.desc}
                  </p>
                  <div style={{ color: "var(--green)", fontSize: "0.75rem", fontWeight: 700 }}>
                    🔍 {tool.msv} searches/mo
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* States Map */}
        <section>
          <h2 className="section-title">All 50 States — Legal Status</h2>
          <p className="section-subtitle">Click your state to find legal gambling options near you</p>

          {Object.entries(regionGroups).map(([region, regionStates]) => (
            <div key={region} style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                {region}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {regionStates.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/states/${s.slug}/`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "0.5rem",
                      border: `1px solid ${s.onlineSportsbookLegal || s.onlineCasinoLegal ? "rgba(0,255,135,0.3)" : "var(--border)"}`,
                      background: s.onlineSportsbookLegal || s.onlineCasinoLegal ? "rgba(0,255,135,0.07)" : "transparent",
                      color: s.onlineSportsbookLegal || s.onlineCasinoLegal ? "var(--text-primary)" : "var(--text-muted)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {s.onlineSportsbookLegal || s.onlineCasinoLegal ? "✅" : "❌"} {s.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Why Trust Us */}
        <section className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>
            Why Trust <span style={{ color: "var(--green)" }}>{SITE.name}</span>?
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: "1.7" }}>
            We independently review and test every operator on real money. We are transparent about our affiliate relationships — operators pay us when you sign up, but this never influences our ratings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Independent Reviews", desc: "Our team tests every operator with real money deposits and withdrawals." },
              { icon: "⚖️", title: "Licensed Only", desc: "We only list operators with a valid US state gaming license. No offshore casinos." },
              { icon: "🔄", title: "Updated Monthly", desc: "Bonus offers, tax rates, and legal status checked and updated every month." },
            ].map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{item.title}</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
