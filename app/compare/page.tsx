import type { Metadata } from "next";
import Link from "next/link";
import { sportsbooks, casinos } from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Sportsbook & Casino Comparisons ${SITE.currentYear} — Side-by-Side Reviews`,
  description: `Compare the best US sportsbooks and online casinos side by side. DraftKings vs FanDuel, BetMGM vs Caesars, and more. Updated ${SITE.currentYear}.`,
};

// Generate all valid pairs
function getPairs<T extends { slug: string; name: string }>(items: T[]) {
  const pairs: Array<{ slugA: string; slugB: string; nameA: string; nameB: string }> = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push({
        slugA: items[i].slug,
        slugB: items[j].slug,
        nameA: items[i].name,
        nameB: items[j].name,
      });
    }
  }
  return pairs;
}

const sbPairs = getPairs(sportsbooks.filter((s) => s.tier !== "tier3"));
const casinoPairs = getPairs(casinos.filter((c) => c.tier !== "tier3"));

export default function ComparePage() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Sportsbook & Casino Comparisons
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0 }}>
            Head-to-head reviews comparing the top US sportsbooks and online casinos.
            Find out which is better for your betting style.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h2 className="section-title">Sportsbook Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sbPairs.map(({ slugA, slugB, nameA, nameB }) => (
              <Link
                key={`${slugA}-vs-${slugB}`}
                href={`/compare/${slugA}-vs-${slugB}/`}
                style={{ textDecoration: "none" }}
              >
                <div className="card card-hover" style={{ padding: "1rem" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      fontSize: "0.9375rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {nameA} vs {nameB}
                  </div>
                  <div style={{ color: "var(--green)", fontSize: "0.75rem", fontWeight: 600 }}>
                    Side-by-side comparison →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Casino Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {casinoPairs.map(({ slugA, slugB, nameA, nameB }) => (
              <Link
                key={`${slugA}-vs-${slugB}`}
                href={`/compare/${slugA}-vs-${slugB}/`}
                style={{ textDecoration: "none" }}
              >
                <div className="card card-hover" style={{ padding: "1rem" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      fontSize: "0.9375rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {nameA} vs {nameB}
                  </div>
                  <div style={{ color: "var(--gold)", fontSize: "0.75rem", fontWeight: 600 }}>
                    Side-by-side comparison →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
