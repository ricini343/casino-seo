import type { Metadata } from "next";
import Link from "next/link";
import { states, getStatesByRegion } from "@/lib/data";
import LegalStatusBadge from "@/components/LegalStatusBadge";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE } from "@/site.config";

export const metadata: Metadata = {
  title: `Online Gambling by State — All 50 States Legal Guide ${SITE.currentYear}`,
  description: `Is online gambling legal in your state? Complete guide to legal status, licensed operators, and bonuses for all 50 US states. Updated ${SITE.currentYear}.`,
};

export default function StatesPage() {
  const legalCount = states.filter((s) => s.onlineSportsbookLegal || s.onlineCasinoLegal).length;
  const casinoCount = states.filter((s) => s.onlineCasinoLegal).length;
  const regionGroups = getStatesByRegion();

  return (
    <>
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)", borderBottom: "1px solid var(--border)", padding: "2.5rem 1.5rem 2rem" }}>
        <div className="max-w-6xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "States" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Online Gambling by State — {SITE.currentYear}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: "0 0 1.5rem", maxWidth: "640px" }}>
            Find your state, check legal status, and see which sportsbooks and casinos are available where you live.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div className="highlight-box" style={{ padding: "0.75rem 1.25rem" }}>
              <span style={{ color: "var(--green)", fontWeight: 800, fontSize: "1.5rem" }}>{legalCount}</span>
              <span style={{ color: "var(--text-muted)", marginLeft: "0.5rem", fontSize: "0.875rem" }}>States with legal online gambling</span>
            </div>
            <div className="highlight-box" style={{ padding: "0.75rem 1.25rem" }}>
              <span style={{ color: "var(--gold)", fontWeight: 800, fontSize: "1.5rem" }}>{casinoCount}</span>
              <span style={{ color: "var(--text-muted)", marginLeft: "0.5rem", fontSize: "0.875rem" }}>States with legal online casinos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {Object.entries(regionGroups).map(([region, regionStates]) => (
          <div key={region} style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
              {region}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regionStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/states/${s.slug}/`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card card-hover"
                    style={{ padding: "1rem" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.375rem" }}>
                          {s.name}
                        </div>
                        <LegalStatusBadge status={s.legalStatus} />
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        {s.taxRate !== null && (
                          <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                            Tax: {s.taxRate}%
                          </div>
                        )}
                        {s.sportsbookLaunchYear && (
                          <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                            Since {s.sportsbookLaunchYear}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                      {s.onlineSportsbookLegal && (
                        <span style={{ padding: "2px 8px", background: "rgba(0,255,135,0.08)", border: "1px solid rgba(0,255,135,0.2)", borderRadius: "9999px", fontSize: "0.7rem", color: "var(--green)", fontWeight: 600 }}>
                          ⚡ Sports
                        </span>
                      )}
                      {s.onlineCasinoLegal && (
                        <span style={{ padding: "2px 8px", background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "9999px", fontSize: "0.7rem", color: "var(--gold)", fontWeight: 600 }}>
                          🎰 Casino
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
