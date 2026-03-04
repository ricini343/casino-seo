import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  sportsbooks,
  casinos,
  getSportsbookBySlug,
  getCasinoBySlug,
  getStatesForSportsbook,
  getStatesForCasino,
  affiliateLink,
} from "@/lib/data";
import { SITE } from "@/site.config";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
import FAQSection from "@/components/FAQSection";
import { TrophyIcon } from "@/components/SiteIcon";

interface Props {
  params: { matchup: string };
}

function getPairs<T extends { slug: string; tier: string }>(items: T[]) {
  const pairs: Array<[string, string]> = [];
  const filtered = items.filter((i) => i.tier !== "tier3");
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      pairs.push([filtered[i].slug, filtered[j].slug]);
    }
  }
  return pairs;
}

export async function generateStaticParams() {
  const sbPairs = getPairs(sportsbooks).map(([a, b]) => ({ matchup: `${a}-vs-${b}` }));
  const casinoPairs = getPairs(casinos).map(([a, b]) => ({ matchup: `${a}-vs-${b}` }));
  return [...sbPairs, ...casinoPairs];
}

function parseMatchup(matchup: string) {
  const vsIdx = matchup.indexOf("-vs-");
  if (vsIdx === -1) return null;
  const slugA = matchup.slice(0, vsIdx);
  const slugB = matchup.slice(vsIdx + 4);
  return { slugA, slugB };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseMatchup(params.matchup);
  if (!parsed) return {};
  const { slugA, slugB } = parsed;

  const sbA = getSportsbookBySlug(slugA) ?? getSportsbookBySlug(slugB);
  const sbB = getSportsbookBySlug(slugA) ? getSportsbookBySlug(slugB) : null;
  const caA = !sbA ? getCasinoBySlug(slugA) : null;
  const caB = !sbB && caA ? getCasinoBySlug(slugB) : null;

  const nameA = sbA?.name ?? caA?.name ?? slugA;
  const nameB = sbB?.name ?? caB?.name ?? slugB;

  return {
    title: `${nameA} vs ${nameB} ${SITE.currentYear} — Which Is Better?`,
    description: `${nameA} vs ${nameB}: detailed side-by-side comparison of bonuses, odds, app ratings, and features. Which sportsbook/casino should you choose?`,
  };
}

export default function ComparisonPage({ params }: Props) {
  const parsed = parseMatchup(params.matchup);
  if (!parsed) notFound();

  const { slugA, slugB } = parsed;

  // Try sportsbooks first, then casinos
  const sbA = getSportsbookBySlug(slugA);
  const sbB = getSportsbookBySlug(slugB);
  const caA = getCasinoBySlug(slugA);
  const caB = getCasinoBySlug(slugB);

  // Must be same type (both sportsbooks or both casinos)
  const isSportsbookComparison = !!(sbA && sbB);
  const isCasinoComparison = !!(caA && caB);

  if (!isSportsbookComparison && !isCasinoComparison) notFound();

  // Normalize to common shape
  interface CompItem {
    name: string;
    slug: string;
    bonus: string;
    highlight: string;
    cons: string;
    tier: string;
    states: ReturnType<typeof getStatesForSportsbook>;
    affiliateWarning?: string;
    // sportsbook-specific
    iosRating?: number;
    androidRating?: number;
    loyalty?: string | null;
    withdrawal: string;
    paymentMethods: string[];
    uniqueFeatures?: string[];
    // casino-specific
    rtp?: number;
    slots?: number;
    tableGames?: number;
    liveDealerCount?: number;
    wagering?: number;
  }

  const itemA: CompItem = isSportsbookComparison
    ? {
        name: sbA!.name,
        slug: sbA!.slug,
        bonus: sbA!.welcomeBonus,
        highlight: sbA!.reviewHighlights,
        cons: sbA!.cons,
        tier: sbA!.tier,
        states: getStatesForSportsbook(sbA!.slug),
        affiliateWarning: sbA!.affiliateWarning,
        iosRating: sbA!.appRatingIos,
        androidRating: sbA!.appRatingAndroid,
        loyalty: sbA!.loyaltyProgram,
        withdrawal: sbA!.withdrawalSpeed,
        paymentMethods: sbA!.paymentMethods,
        uniqueFeatures: sbA!.uniqueFeatures,
      }
    : {
        name: caA!.name,
        slug: caA!.slug,
        bonus: caA!.welcomeBonus,
        highlight: caA!.reviewHighlights,
        cons: caA!.cons,
        tier: caA!.tier,
        states: getStatesForCasino(caA!.slug),
        affiliateWarning: caA!.affiliateWarning,
        rtp: caA!.rtp,
        slots: caA!.numberOfSlots,
        tableGames: caA!.numberOfTableGames,
        liveDealerCount: caA!.numberOfLiveDealerGames,
        wagering: caA!.wageringRequirement,
        loyalty: caA!.loyaltyProgram,
        withdrawal: caA!.withdrawalSpeed,
        paymentMethods: caA!.paymentMethods,
      };

  const itemB: CompItem = isSportsbookComparison
    ? {
        name: sbB!.name,
        slug: sbB!.slug,
        bonus: sbB!.welcomeBonus,
        highlight: sbB!.reviewHighlights,
        cons: sbB!.cons,
        tier: sbB!.tier,
        states: getStatesForSportsbook(sbB!.slug),
        affiliateWarning: sbB!.affiliateWarning,
        iosRating: sbB!.appRatingIos,
        androidRating: sbB!.appRatingAndroid,
        loyalty: sbB!.loyaltyProgram,
        withdrawal: sbB!.withdrawalSpeed,
        paymentMethods: sbB!.paymentMethods,
        uniqueFeatures: sbB!.uniqueFeatures,
      }
    : {
        name: caB!.name,
        slug: caB!.slug,
        bonus: caB!.welcomeBonus,
        highlight: caB!.reviewHighlights,
        cons: caB!.cons,
        tier: caB!.tier,
        states: getStatesForCasino(caB!.slug),
        affiliateWarning: caB!.affiliateWarning,
        rtp: caB!.rtp,
        slots: caB!.numberOfSlots,
        tableGames: caB!.numberOfTableGames,
        liveDealerCount: caB!.numberOfLiveDealerGames,
        wagering: caB!.wageringRequirement,
        loyalty: caB!.loyaltyProgram,
        withdrawal: caB!.withdrawalSpeed,
        paymentMethods: caB!.paymentMethods,
      };

  const winner =
    itemA.tier === "tier1" && itemB.tier !== "tier1"
      ? itemA
      : itemB.tier === "tier1" && itemA.tier !== "tier1"
      ? itemB
      : null;

  const faqs = [
    {
      q: `${itemA.name} vs ${itemB.name}: which is better?`,
      a: `Both ${itemA.name} and ${itemB.name} are licensed, legal operators. ${itemA.name} stands out for: ${itemA.highlight.split(".")[0]}. ${itemB.name} excels at: ${itemB.highlight.split(".")[0]}. The best choice depends on your priorities — bonus value, odds, app quality, or state availability.`,
    },
    {
      q: `Can I use both ${itemA.name} and ${itemB.name}?`,
      a: `Yes — and you should. Using multiple ${isSportsbookComparison ? "sportsbooks" : "online casinos"} lets you claim multiple welcome bonuses and always get the best available ${isSportsbookComparison ? "odds" : "promotions"}. There's no rule against having accounts at multiple licensed operators.`,
    },
    {
      q: `Which has a better welcome bonus — ${itemA.name} or ${itemB.name}?`,
      a: `${itemA.name} offers: ${itemA.bonus}. ${itemB.name} offers: ${itemB.bonus}. The "better" bonus depends on your deposit amount and how you intend to use it. Always read the full terms of both offers before deciding.`,
    },
  ];

  const reviewHref = isSportsbookComparison
    ? `/sportsbooks/${itemA.slug}/`
    : `/casinos/${itemA.slug}/`;
  const reviewHrefB = isSportsbookComparison
    ? `/sportsbooks/${itemB.slug}/`
    : `/casinos/${itemB.slug}/`;

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
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare/" },
              { label: `${itemA.name} vs ${itemB.name}` },
            ]}
          />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            {itemA.name} vs {itemB.name} ({SITE.currentYear})
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
            Side-by-side comparison of bonuses, features, and{" "}
            {isSportsbookComparison ? "odds quality" : "game selection"}.
            Which is right for you?
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Winner banner */}
        {winner && (
          <div
            style={{
              background: "rgba(0,255,135,0.07)",
              border: "1px solid rgba(0,255,135,0.3)",
              borderRadius: "0.75rem",
              padding: "1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ color: "var(--green)" }}><TrophyIcon size={24} /></span>
            <div>
              <strong style={{ color: "var(--green)" }}>Our Pick: {winner.name}</strong>
              <span style={{ color: "var(--text-muted)", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
                — Top-rated by our editorial team based on overall experience
              </span>
            </div>
          </div>
        )}

        {/* Two-column hero cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {[itemA, itemB].map((item) => (
            <div
              key={item.slug}
              className="card"
              style={{
                borderColor:
                  winner?.slug === item.slug
                    ? "rgba(0,255,135,0.4)"
                    : undefined,
              }}
            >
              {winner?.slug === item.slug && (
                <div
                  style={{
                    background: "var(--green)",
                    color: "#0a0e1a",
                    padding: "2px 12px",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    borderRadius: "9999px",
                    display: "inline-block",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  ✓ OUR PICK
                </div>
              )}
              <h2
                style={{
                  fontWeight: 800,
                  fontSize: "1.125rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                {item.name}
              </h2>
              <StarRating
                rating={item.tier === "tier1" ? 5 : item.tier === "tier2" ? 4 : 3}
                size="sm"
              />
              <div
                style={{
                  margin: "0.75rem 0",
                  padding: "0.75rem",
                  background: isSportsbookComparison
                    ? "rgba(0,255,135,0.07)"
                    : "rgba(255,215,0,0.07)",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    color: isSportsbookComparison ? "var(--green)" : "var(--gold)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  {item.bonus}
                </div>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8125rem",
                  lineHeight: "1.5",
                  marginBottom: "1rem",
                }}
              >
                {item.highlight.split(".")[0]}.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {!item.affiliateWarning ? (
                  <Link
                    href={affiliateLink(item.slug)}
                    className={isSportsbookComparison ? "btn-primary" : "btn-gold"}
                    rel="nofollow sponsored"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Claim Bonus →
                  </Link>
                ) : (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "#ef4444",
                      padding: "4px 8px",
                      background: "rgba(239,68,68,0.08)",
                      borderRadius: "0.375rem",
                    }}
                  >
                    No affiliate program
                  </span>
                )}
                <Link
                  href={item.slug.includes("casino") || isCasinoComparison ? reviewHref.replace(itemA.slug, item.slug) : (item.slug === itemA.slug ? reviewHref : reviewHrefB)}
                  className="btn-outline"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section>
          <h2 className="section-title">Side-by-Side Comparison</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{itemA.name}</th>
                  <th>{itemB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Welcome Bonus</td>
                  <td>{itemA.bonus}</td>
                  <td>{itemB.bonus}</td>
                </tr>
                {isSportsbookComparison && (
                  <>
                    <tr>
                      <td>iOS Rating</td>
                      <td style={{ color: (itemA.iosRating ?? 0) >= (itemB.iosRating ?? 0) ? "var(--green)" : "inherit", fontWeight: (itemA.iosRating ?? 0) >= (itemB.iosRating ?? 0) ? 700 : 400 }}>
                        {itemA.iosRating} ★
                      </td>
                      <td style={{ color: (itemB.iosRating ?? 0) >= (itemA.iosRating ?? 0) ? "var(--green)" : "inherit", fontWeight: (itemB.iosRating ?? 0) >= (itemA.iosRating ?? 0) ? 700 : 400 }}>
                        {itemB.iosRating} ★
                      </td>
                    </tr>
                    <tr>
                      <td>Android Rating</td>
                      <td>{itemA.androidRating} ★</td>
                      <td>{itemB.androidRating} ★</td>
                    </tr>
                  </>
                )}
                {isCasinoComparison && (
                  <>
                    <tr>
                      <td>RTP</td>
                      <td style={{ color: (itemA.rtp ?? 0) >= (itemB.rtp ?? 0) ? "var(--green)" : "inherit", fontWeight: (itemA.rtp ?? 0) >= (itemB.rtp ?? 0) ? 700 : 400 }}>
                        {itemA.rtp}%
                      </td>
                      <td style={{ color: (itemB.rtp ?? 0) >= (itemA.rtp ?? 0) ? "var(--green)" : "inherit", fontWeight: (itemB.rtp ?? 0) >= (itemA.rtp ?? 0) ? 700 : 400 }}>
                        {itemB.rtp}%
                      </td>
                    </tr>
                    <tr>
                      <td>Wagering Req.</td>
                      <td style={{ color: (itemA.wagering ?? 99) <= (itemB.wagering ?? 99) ? "var(--green)" : "inherit", fontWeight: (itemA.wagering ?? 99) <= (itemB.wagering ?? 99) ? 700 : 400 }}>
                        {itemA.wagering}x
                      </td>
                      <td style={{ color: (itemB.wagering ?? 99) <= (itemA.wagering ?? 99) ? "var(--green)" : "inherit", fontWeight: (itemB.wagering ?? 99) <= (itemA.wagering ?? 99) ? 700 : 400 }}>
                        {itemB.wagering}x
                      </td>
                    </tr>
                    <tr>
                      <td>Slot Titles</td>
                      <td>{itemA.slots}+</td>
                      <td>{itemB.slots}+</td>
                    </tr>
                    <tr>
                      <td>Table Games</td>
                      <td>{itemA.tableGames}+</td>
                      <td>{itemB.tableGames}+</td>
                    </tr>
                    <tr>
                      <td>Live Dealer</td>
                      <td>{itemA.liveDealerCount}+ games</td>
                      <td>{itemB.liveDealerCount}+ games</td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>Withdrawal Speed</td>
                  <td>{itemA.withdrawal}</td>
                  <td>{itemB.withdrawal}</td>
                </tr>
                <tr>
                  <td>Loyalty Program</td>
                  <td>{itemA.loyalty ?? "None"}</td>
                  <td>{itemB.loyalty ?? "None"}</td>
                </tr>
                <tr>
                  <td>Available States</td>
                  <td>{itemA.states.length} states</td>
                  <td>{itemB.states.length} states</td>
                </tr>
                <tr>
                  <td>Payment Methods</td>
                  <td>{itemA.paymentMethods.length} options</td>
                  <td>{itemB.paymentMethods.length} options</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Verdict */}
        <section style={{ maxWidth: "680px" }}>
          <h2 className="section-title">
            {itemA.name} vs {itemB.name}: Our Verdict
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>{itemA.name}</strong> is the
            better choice if: {itemA.highlight.split(".")[0].toLowerCase()}.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>{itemB.name}</strong> is the
            better choice if: {itemB.highlight.split(".")[0].toLowerCase()}.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
            Our recommendation: <strong style={{ color: isSportsbookComparison ? "var(--green)" : "var(--gold)" }}>
              use both
            </strong>. Having accounts at multiple{" "}
            {isSportsbookComparison ? "sportsbooks" : "casinos"} lets you claim both
            welcome bonuses and always choose the best available offer. Both operators are
            licensed, safe, and regulated.
          </p>
        </section>

        <FAQSection faqs={faqs} title={`${itemA.name} vs ${itemB.name} FAQ`} />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/compare/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
            ← All Comparisons
          </Link>
          <Link
            href={reviewHref}
            className="btn-outline"
            style={{ fontSize: "0.875rem" }}
          >
            {itemA.name} Full Review
          </Link>
          <Link
            href={reviewHrefB}
            className="btn-outline"
            style={{ fontSize: "0.875rem" }}
          >
            {itemB.name} Full Review
          </Link>
        </div>
      </div>
    </>
  );
}
