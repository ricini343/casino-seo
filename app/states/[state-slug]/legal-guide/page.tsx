import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { states, getStateBySlug, getSportsbooksForState, getCasinosForState } from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import LegalStatusBadge from "@/components/LegalStatusBadge";
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
  return {
    title: `Is Online Gambling Legal in ${state.name}? ${SITE.currentYear} Legal Guide`,
    description: `Complete guide to ${state.name} gambling laws. Is online sports betting and casino gambling legal? Age requirements, tax rates, licensed operators, and pending legislation.`,
  };
}

export default function StateLegalGuidePage({ params }: Props) {
  const state = getStateBySlug(params["state-slug"]);
  if (!state) notFound();

  const sportsbooks = getSportsbooksForState(state.abbr);
  const casinos = getCasinosForState(state.abbr);
  const isLegal = state.onlineSportsbookLegal || state.onlineCasinoLegal;

  const faqs = [
    {
      q: `Is online gambling legal in ${state.name} in ${SITE.currentYear}?`,
      a: isLegal
        ? `Yes — ${state.onlineSportsbookLegal ? "online sports betting" : ""}${state.onlineSportsbookLegal && state.onlineCasinoLegal ? " and " : ""}${state.onlineCasinoLegal ? "online casino gambling" : ""} ${state.onlineSportsbookLegal && state.onlineCasinoLegal ? "are" : "is"} legal in ${state.name} as of ${SITE.currentYear}. ${state.legalStatus === "limited" ? "However, options are limited — see details above." : ""}`
        : `No. Online gambling is not currently legal in ${state.name}. ${state.notes}`,
    },
    {
      q: `What is the legal gambling age in ${state.name}?`,
      a: `The minimum gambling age in ${state.name} is ${state.ageRequirement ?? 21} years old. This applies to both online and in-person gambling. All licensed operators are required to verify age at registration.`,
    },
    {
      q: `Are gambling winnings taxable in ${state.name}?`,
      a: `Yes. Gambling winnings are federally taxable as ordinary income — you must report them on your federal tax return. ${state.name} has its own income tax rules as well. Sportsbooks and casinos are required to issue W-2G forms for certain winnings. Consult a tax professional to ensure compliance.`,
    },
    {
      q: `Who regulates gambling in ${state.name}?`,
      a: `Gambling in ${state.name} is regulated by the ${state.regulatoryBody}. ${state.regulatoryBodyUrl ? `You can find official information at: ${state.regulatoryBodyUrl}` : ""}`,
    },
    {
      q: `Can I bet on sports from ${state.name} using offshore sites?`,
      a: `Offshore gambling sites operate outside US regulations and are not licensed by ${state.name}. While enforcement against individual users is rare, there is no consumer protection if an offshore site refuses to pay winnings or has security issues. ${SITE.name} only recommends licensed, regulated US operators.`,
    },
  ];

  return (
    <>
      <div
        style={{
          background: isLegal ? "linear-gradient(135deg,#0a0e1a 0%,#091520 100%)" : "linear-gradient(135deg,#0a0e1a 0%,#1a0a0a 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Breadcrumb crumbs={[
            { label: "Home", href: "/" },
            { label: "States", href: "/states/" },
            { label: state.name, href: `/states/${state.slug}/` },
            { label: "Legal Guide" },
          ]} />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, margin: 0 }}>
              Is Online Gambling Legal in {state.name}?
            </h1>
            <LegalStatusBadge status={state.legalStatus} large />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            Complete {SITE.currentYear} guide to {state.name} gambling laws, licensed operators, and what you can legally bet on.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Status summary box */}
        <div
          style={{
            background: isLegal ? "rgba(0,255,135,0.06)" : "rgba(239,68,68,0.06)",
            border: `1px solid ${isLegal ? "rgba(0,255,135,0.25)" : "rgba(239,68,68,0.25)"}`,
            borderRadius: "0.75rem",
            padding: "1.5rem",
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: "1.125rem", marginBottom: "1rem", color: isLegal ? "var(--green)" : "#ef4444" }}>
            {isLegal ? `Online Gambling is Legal in ${state.name}` : `Online Gambling is Not Legal in ${state.name}`}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Online Sports Betting", value: state.onlineSportsbookLegal ? `Legal since ${state.sportsbookLaunchYear}` : "Not Legal", ok: state.onlineSportsbookLegal },
              { label: "Online Casino", value: state.onlineCasinoLegal ? `Legal since ${state.casinoLaunchYear}` : "Not Legal", ok: state.onlineCasinoLegal },
              { label: "Minimum Age", value: `${state.ageRequirement ?? 21}+`, ok: true },
              { label: "Tax Rate (GGR)", value: state.taxRate !== null ? `${state.taxRate}%` : "N/A", ok: true },
              { label: "Regulator", value: state.regulatoryBody.split("(")[0].trim(), ok: isLegal },
            ].map((r) => (
              <div key={r.label} style={{ background: "rgba(0,0,0,0.2)", borderRadius: "0.5rem", padding: "0.75rem" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "3px" }}>{r.label}</div>
                <div style={{ color: r.ok ? "var(--green)" : "#ef4444", fontWeight: 700, fontSize: "0.9375rem" }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <article style={{ maxWidth: "680px" }}>
          <h2 className="section-title">Overview: Gambling in {state.name}</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {state.notes} The {state.regulatoryBody} oversees all gambling operations in the state.
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Online Sports Betting in {state.name}</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {state.onlineSportsbookLegal
              ? `Online sports betting has been legal in ${state.name} since ${state.sportsbookLaunchYear}. There are currently ${sportsbooks.length} licensed sportsbook apps operating in the state. The state taxes operators at ${state.taxRate !== null ? `${state.taxRate}% of gross gaming revenue` : "a rate set by the legislature"}.`
              : `Online sports betting is not currently legal in ${state.name}. Residents who wish to bet on sports legally must travel to a neighboring state where it is legal.`}
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Online Casino Gambling in {state.name}</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            {state.onlineCasinoLegal
              ? `Online casino gambling (slots, table games, live dealer) became legal in ${state.name} in ${state.casinoLaunchYear}. Currently ${casinos.length} licensed online casinos operate. All are regulated by the ${state.regulatoryBody}.`
              : `Online casino gambling (slots, blackjack, roulette, poker) is not legal in ${state.name}. Online casino legislation has been considered but has not passed.`}
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Tax Requirements for Gamblers in {state.name}</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            All gambling winnings are subject to federal income tax as ordinary income. You should report net gambling winnings on your federal tax return. Sportsbooks and casinos may issue W-2G forms for significant winnings. Keep records of your gambling activity — wins and losses — throughout the year. {state.name} residents should also check state income tax rules for gambling winnings.
          </p>

          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.75rem" }}>Responsible Gambling Resources in {state.name}</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "0.75rem" }}>
            Problem gambling is a serious issue. If gambling is impacting your life or relationships, free confidential help is available:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: "2", paddingLeft: "1.25rem" }}>
            <li>
              <a href={`tel:${SITE.helpline.replace(/-/g, "")}`} style={{ color: "var(--green)" }}>
                National Problem Gambling Helpline: {SITE.helpline}
              </a>
              {" "}(call or text, 24/7)
            </li>
            <li><a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>National Council on Problem Gambling (ncpgambling.org)</a></li>
            {state.selfExclusionProgram && <li>{state.name} Self-Exclusion: {state.selfExclusionProgram}</li>}
          </ul>
        </article>

        {/* Licensed operators */}
        {(sportsbooks.length > 0 || casinos.length > 0) && (
          <section>
            <h2 className="section-title">Licensed Operators in {state.name}</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[...sportsbooks, ...casinos].map((op) => (
                <Link
                  key={op.slug}
                  href={`/${sportsbooks.includes(op as typeof sportsbooks[0]) ? "sportsbooks" : "casinos"}/${op.slug}/`}
                  style={{
                    padding: "0.375rem 0.875rem",
                    border: "1px solid rgba(0,255,135,0.25)",
                    background: "rgba(0,255,135,0.06)",
                    borderRadius: "0.5rem",
                    color: "var(--green)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  ✓ {op.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <FAQSection faqs={faqs} title={`${state.name} Gambling Laws FAQ`} />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href={`/states/${state.slug}/`} className="btn-primary" style={{ fontSize: "0.875rem" }}>
            ← Back to {state.name}
          </Link>
          <Link href="/states/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            All States
          </Link>
        </div>
      </div>
    </>
  );
}
