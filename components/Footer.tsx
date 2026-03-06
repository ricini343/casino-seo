import Link from "next/link";
import { states, sportsbooks, casinos } from "@/lib/data";
import { SITE } from "@/site.config";

export default function Footer() {
  const legalStates = states
    .filter((s) => s.onlineSportsbookLegal || s.onlineCasinoLegal)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <footer style={{ backgroundColor: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      {/* Responsible Gambling Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(0,255,135,0.08) 0%, rgba(255,215,0,0.06) 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem", margin: 0 }}>
          <strong style={{ color: "var(--gold)" }}>21+</strong> &nbsp;|&nbsp;
          Gambling Problem? Call the{" "}
          <a
            href={`tel:${SITE.helpline.replace(/-/g, "")}`}
            style={{ color: "var(--green)" }}
          >
            National Problem Gambling Helpline: {SITE.helpline}
          </a>
          &nbsp;|&nbsp; Please gamble responsibly.
        </p>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" style={{ color: "var(--green)", fontWeight: 900, fontSize: "1.25rem", textDecoration: "none" }}>
              {SITE.name}
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: "1.6" }}>
              Your guide to legal online gambling in the United States. We review, compare, and rank the best licensed casinos and sportsbooks.
            </p>
            <div className="flex gap-3 mt-4">
              <span
                style={{
                  padding: "0.25rem 0.625rem",
                  background: "rgba(0,255,135,0.12)",
                  border: "1px solid rgba(0,255,135,0.25)",
                  borderRadius: "9999px",
                  color: "var(--green)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                21+ Only
              </span>
              <span
                style={{
                  padding: "0.25rem 0.625rem",
                  background: "rgba(255,215,0,0.12)",
                  border: "1px solid rgba(255,215,0,0.25)",
                  borderRadius: "9999px",
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                US Only
              </span>
            </div>
          </div>

          {/* Legal States */}
          <div>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Legal States
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.375rem" }}>
              {legalStates.slice(0, 20).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/states/${s.slug}/`}
                    style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textDecoration: "none" }}
                  >
                    {s.abbr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Casinos & Sportsbooks */}
          <div>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Casinos
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "1.5rem" }}>
              {casinos.slice(0, 6).map((c) => (
                <li key={c.slug} style={{ marginBottom: "0.375rem" }}>
                  <Link
                    href={`/casinos/${c.slug}/`}
                    style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textDecoration: "none" }}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Sportsbooks
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sportsbooks.slice(0, 5).map((s) => (
                <li key={s.slug} style={{ marginBottom: "0.375rem" }}>
                  <Link
                    href={`/sportsbooks/${s.slug}/`}
                    style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textDecoration: "none" }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Links */}
          <div>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tools
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "1.5rem" }}>
              {[
                { label: "Parlay Calculator", href: "/tools/parlay-calculator/" },
                { label: "Odds Converter", href: "/tools/odds-converter/" },
                { label: "Betting Calculator", href: "/tools/betting-calculator/" },
                { label: "EV Calculator", href: "/tools/ev-calculator/" },
              ].map((t) => (
                <li key={t.href} style={{ marginBottom: "0.375rem" }}>
                  <Link href={t.href} style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textDecoration: "none" }}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Info
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "All States", href: "/states/" },
                { label: "Bonuses", href: "/bonuses/" },
                { label: "Blog", href: "/blog/" },
                { label: "About", href: "/about/" },
                { label: "Privacy Policy", href: "/privacy/" },
                { label: "Terms of Use", href: "/terms/" },
              ].map((t) => (
                <li key={t.href} style={{ marginBottom: "0.375rem" }}>
                  <Link href={t.href} style={{ color: "var(--text-muted)", fontSize: "0.8125rem", textDecoration: "none" }}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
            color: "var(--text-muted)",
            fontSize: "0.8125rem",
            lineHeight: "1.7",
          }}
        >
          <p style={{ marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--text-secondary)" }}>Disclaimer:</strong> {SITE.name} is an independent review and comparison website. We may earn a commission if you register or deposit with an operator through our affiliate links. This does not affect our editorial independence or rankings. All information is for entertainment purposes only. Online gambling may be illegal in your jurisdiction — please check your local laws before signing up.
          </p>
          <p style={{ marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--text-secondary)" }}>Responsible Gambling:</strong> Gambling involves risk. Only bet what you can afford to lose. If gambling is becoming a problem, contact the{" "}
            <a href={`tel:${SITE.helpline.replace(/-/g, "")}`} style={{ color: "var(--green)" }}>
              {SITE.helplineName} ({SITE.helpline})
            </a>{" "}
            or visit{" "}
            <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>
              ncpgambling.org
            </a>
            .
          </p>
          <p>© {SITE.currentYear} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
