import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  states,
  getStateBySlug,
  getSportsbooksForState,
  getCasinosForState,
  getAvailabilityForState,
  formatPopulation,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import LegalStatusBadge from "@/components/LegalStatusBadge";
import OperatorCard from "@/components/OperatorCard";
import FAQSection from "@/components/FAQSection";

interface Props {
  params: { "state-slug": string };
}

export async function generateStaticParams() {
  return states.map((s) => ({ "state-slug": s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = getStateBySlug(params["state-slug"]);
  if (!state) return {};

  const isLegal = state.onlineSportsbookLegal || state.onlineCasinoLegal;
  const statusWord = isLegal ? "Legal" : "Illegal";

  return {
    title: `${state.name} Online Gambling — ${statusWord} Status & Best Sites ${SITE.currentYear}`,
    description: `Is online gambling legal in ${state.name}? ${isLegal ? `Yes — sports betting${state.onlineCasinoLegal ? " and online casinos are" : " is"} legal since ${state.sportsbookLaunchYear}.` : "Not yet."} Find the best licensed operators and exclusive bonuses.`,
    openGraph: {
      title: `${state.name} Online Gambling Guide ${SITE.currentYear}`,
      description: `Legal status, top sportsbooks, best casinos, and exclusive bonuses for ${state.name} gamblers.`,
    },
  };
}

export default function StatePage({ params }: Props) {
  const state = getStateBySlug(params["state-slug"]);
  if (!state) notFound();

  const sportsbooks = getSportsbooksForState(state.abbr);
  const casinos = getCasinosForState(state.abbr);
  const avail = getAvailabilityForState(state.abbr);
  const isLegal = state.onlineSportsbookLegal || state.onlineCasinoLegal;

  const faqs = [
    {
      q: `Is online gambling legal in ${state.name}?`,
      a: isLegal
        ? `Yes, online gambling is legal in ${state.name}. ${state.onlineSportsbookLegal ? `Online sports betting has been legal since ${state.sportsbookLaunchYear}.` : ""} ${state.onlineCasinoLegal ? `Online casino gambling has been legal since ${state.casinoLaunchYear}.` : ""} All operators listed on this page hold a valid ${state.name} license.`
        : `Online gambling is not currently legal in ${state.name}. ${state.notes} Offshore sites operate in a legal gray area — we strongly recommend only using licensed, regulated US sites.`,
    },
    {
      q: `What is the legal gambling age in ${state.name}?`,
      a: state.ageRequirement
        ? `You must be ${state.ageRequirement} years or older to gamble in ${state.name}. This applies to both online and retail gambling. All licensed operators verify age during registration.`
        : `The legal gambling age information for ${state.name} varies by game type. Generally, the minimum is 21 for casino games and some sports betting.`,
    },
    {
      q: `How many sportsbooks are legal in ${state.name}?`,
      a: sportsbooks.length > 0
        ? `There are currently ${sportsbooks.length} licensed sportsbooks operating in ${state.name}: ${sportsbooks.map((s) => s.name).join(", ")}.`
        : `There are no licensed online sportsbooks currently operating in ${state.name}.`,
    },
    ...(state.onlineCasinoLegal
      ? [{
          q: `Are online casinos legal in ${state.name}?`,
          a: `Yes, online casino gambling is legal in ${state.name} since ${state.casinoLaunchYear}. ${casinos.length} licensed casinos currently operate: ${casinos.map((c) => c.name).join(", ")}. All are regulated by the ${state.regulatoryBody}.`,
        }]
      : []),
    {
      q: `Do I have to pay taxes on gambling winnings in ${state.name}?`,
      a: `Yes. Gambling winnings are taxable as ordinary income at the federal level (report on Schedule 1, Form 1040). ${state.taxRate !== null ? `${state.name} operators pay a ${state.taxRate}% tax on gross gaming revenue.` : ""} As a player, you are responsible for reporting net winnings. Keep records of wins and losses. Consult a tax professional for specifics.`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: isLegal
            ? "linear-gradient(135deg, #0a0e1a 0%, #091520 60%, #0a0e1a 100%)"
            : "linear-gradient(135deg, #0a0e1a 0%, #1a0a0a 60%, #0a0e1a 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isLegal && (
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(ellipse, rgba(0,255,135,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        )}
        <div className="max-w-5xl mx-auto" style={{ position: "relative" }}>
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "States", href: "/states/" },
              { label: state.name },
            ]}
          />
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, margin: 0 }}>
                  {state.name} Online Gambling {SITE.currentYear}
                </h1>
                <LegalStatusBadge status={state.legalStatus} large />
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: "0 0 1.25rem", lineHeight: "1.6", maxWidth: "640px" }}>
                {state.notes}
              </p>
              {/* Quick stats */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {[
                  { label: "Population", value: formatPopulation(state.population) },
                  { label: "Min Age", value: state.ageRequirement ? `${state.ageRequirement}+` : "N/A" },
                  { label: "Tax Rate", value: state.taxRate !== null ? `${state.taxRate}%` : "N/A" },
                  { label: "Legal Since", value: state.sportsbookLaunchYear?.toString() ?? "—" },
                  { label: "Regulator", value: state.regulatoryBody.split(" (")[0].split(" /")[0] },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "0.625rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
                      {stat.label}
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9375rem" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Not legal — pending info */}
        {!isLegal && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
          >
            <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#ef4444", marginBottom: "0.75rem" }}>
              Online Gambling is Not Legal in {state.name}
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", margin: "0 0 1rem" }}>
              As of {SITE.currentYear}, {state.name} has not legalized online sports betting or casino gambling for residents. {state.notes}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
              We recommend checking back — many states are actively moving legislation. When {state.name} legalizes, we will update this page immediately with the best licensed operators and bonuses.
            </p>
          </div>
        )}

        {/* Top Sportsbooks */}
        {sportsbooks.length > 0 && (
          <section>
            <h2 className="section-title">Best Sportsbooks in {state.name}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              {sportsbooks.length} licensed sportsbooks currently operate in {state.name}. All are regulated by the {state.regulatoryBody.split(" (")[0]}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sportsbooks.map((sb, i) => (
                <OperatorCard
                  key={sb.slug}
                  name={sb.name}
                  slug={sb.slug}
                  type="sportsbook"
                  welcomeBonus={sb.welcomeBonus}
                  tier={sb.tier}
                  uniqueFeature={sb.uniqueFeatures[0]}
                  rank={i + 1}
                  affiliateWarning={sb.affiliateWarning}
                />
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Link href={`/states/${state.slug}/best-sportsbooks/`} style={{ color: "var(--green)", fontWeight: 600, fontSize: "0.875rem" }}>
                See full sportsbook rankings for {state.name} →
              </Link>
            </div>
          </section>
        )}

        {/* Top Casinos */}
        {casinos.length > 0 && (
          <section>
            <h2 className="section-title">Best Online Casinos in {state.name}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Online casino gambling is legal in {state.name} since {state.casinoLaunchYear}. {casinos.length} licensed casinos available.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {casinos.map((c, i) => (
                <OperatorCard
                  key={c.slug}
                  name={c.name}
                  slug={c.slug}
                  type="casino"
                  welcomeBonus={c.welcomeBonus}
                  tier={c.tier}
                  uniqueFeature={c.reviewHighlights.split(".")[0]}
                  rank={i + 1}
                  affiliateWarning={c.affiliateWarning}
                />
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Link href={`/states/${state.slug}/best-online-casinos/`} style={{ color: "var(--green)", fontWeight: 600, fontSize: "0.875rem" }}>
                See full casino rankings for {state.name} →
              </Link>
            </div>
          </section>
        )}

        {/* Bonus Comparison Table */}
        {(sportsbooks.length > 0 || casinos.length > 0) && (
          <section>
            <h2 className="section-title">Bonus Comparison Table — {state.name}</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Operator</th>
                    <th>Type</th>
                    <th>Welcome Bonus</th>
                    <th>Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[...sportsbooks.map((s) => ({ ...s, opType: "Sportsbook" as const })), ...casinos.map((c) => ({ ...c, opType: "Casino" as const }))].map((op) => (
                    <tr key={op.slug}>
                      <td>
                        <Link href={`/${op.opType === "Casino" ? "casinos" : "sportsbooks"}/${op.slug}/`} style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                          {op.name}
                        </Link>
                      </td>
                      <td>
                        <span style={{ padding: "2px 8px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 700, background: op.opType === "Casino" ? "rgba(255,215,0,0.1)" : "rgba(0,255,135,0.1)", color: op.opType === "Casino" ? "var(--gold)" : "var(--green)", border: `1px solid ${op.opType === "Casino" ? "rgba(255,215,0,0.25)" : "rgba(0,255,135,0.25)"}` }}>
                          {op.opType}
                        </span>
                      </td>
                      <td style={{ color: "var(--green)" }}>{op.welcomeBonus}</td>
                      <td>{op.tier === "tier1" ? "★★★★★" : op.tier === "tier2" ? "★★★★" : "★★★"}</td>
                      <td>
                        {"affiliateWarning" in op && op.affiliateWarning ? (
                          <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>No affiliate</span>
                        ) : (
                          <Link href={`/go/${op.slug}/`} className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.375rem 0.75rem" }} rel="nofollow sponsored">
                            Claim
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Legal guide */}
        <section>
          <h2 className="section-title">{state.name} Gambling Laws — Full Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="sm:grid-cols-2">
            {[
              { label: "Online Sports Betting", value: state.onlineSportsbookLegal ? `Legal (since ${state.sportsbookLaunchYear})` : "Not Legal", color: state.onlineSportsbookLegal ? "var(--green)" : "#ef4444" },
              { label: "Online Casino", value: state.onlineCasinoLegal ? `Legal (since ${state.casinoLaunchYear})` : "Not Legal", color: state.onlineCasinoLegal ? "var(--green)" : "#ef4444" },
              { label: "Minimum Age", value: state.ageRequirement ? `${state.ageRequirement} years old` : "See state law", color: "var(--text-primary)" },
              { label: "Tax on GGR", value: state.taxRate !== null ? `${state.taxRate}%` : "N/A", color: "var(--text-primary)" },
            ].map((r) => (
              <div key={r.label} className="card" style={{ padding: "1rem" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{r.label}</div>
                <div style={{ color: r.color, fontWeight: 700, fontSize: "1rem" }}>{r.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href={`/states/${state.slug}/legal-guide/`} className="btn-outline" style={{ fontSize: "0.875rem" }}>
              Full Legal Guide for {state.name} →
            </Link>
            {state.regulatoryBodyUrl && (
              <a href={state.regulatoryBodyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.625rem 1rem", color: "var(--text-muted)", fontSize: "0.875rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
                Official Regulator ↗
              </a>
            )}
          </div>
        </section>

        {/* Responsible gambling */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: "1px solid var(--border)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
          }}
        >
          <div style={{ fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            🛡️ Responsible Gambling in {state.name}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0 0 0.5rem", lineHeight: "1.6" }}>
            Gambling should be entertaining. If gambling is becoming a problem, free help is available 24/7:
          </p>
          <a href={`tel:${SITE.helpline.replace(/-/g, "")}`} style={{ color: "var(--green)", fontWeight: 600, fontSize: "0.875rem" }}>
            {SITE.helplineName}: {SITE.helpline}
          </a>
          {state.selfExclusionProgram && (
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.375rem" }}>
              {state.name} self-exclusion: {state.selfExclusionProgram}
            </div>
          )}
        </div>

        <FAQSection faqs={faqs} title={`${state.name} Gambling FAQ`} />

        {/* Internal links */}
        <section>
          <h2 className="section-title">More {state.name} Guides</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {[
              { label: `${state.name} Legal Guide`, href: `/states/${state.slug}/legal-guide/` },
              ...(state.onlineSportsbookLegal ? [{ label: `Best ${state.name} Sportsbooks`, href: `/states/${state.slug}/best-sportsbooks/` }] : []),
              ...(state.onlineCasinoLegal ? [{ label: `Best ${state.name} Casinos`, href: `/states/${state.slug}/best-online-casinos/` }] : []),
              { label: "All States", href: "/states/" },
              { label: "Parlay Calculator", href: "/tools/parlay-calculator/" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="btn-outline" style={{ fontSize: "0.875rem" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
