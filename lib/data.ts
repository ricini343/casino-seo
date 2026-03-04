import statesRaw from "@/data/states.json";
import sportsbooksRaw from "@/data/sportsbooks.json";
import casinosRaw from "@/data/casinos.json";
import availabilityRaw from "@/data/state_availability.json";

// ── Types ──────────────────────────────────────────────────────────────────

export type LegalStatus =
  | "full"
  | "sports-only"
  | "limited"
  | "illegal"
  | "pending";

export interface State {
  name: string;
  slug: string;
  abbr: string;
  region: string;
  population: number;
  onlineCasinoLegal: boolean;
  onlineSportsbookLegal: boolean;
  legalStatus: LegalStatus;
  casinoLaunchYear: number | null;
  sportsbookLaunchYear: number | null;
  taxRate: number | null;
  regulatoryBody: string;
  regulatoryBodyUrl: string | null;
  notes: string;
  affiliateFriendly: boolean;
  ageRequirement: number | null;
  selfExclusionProgram: string | null;
  approxMonthlyGGR: number | null;
  priority: number;
}

export interface Sportsbook {
  name: string;
  slug: string;
  company: string;
  type: string;
  alsoHasCasino: boolean;
  founded: number;
  headquartersCity: string;
  appRatingIos: number;
  appRatingAndroid: number;
  estimatedUsMonthlyUsers: number;
  welcomeBonus: string;
  welcomeBonusType: string;
  promoCodeName: string;
  affiliateProgram: string | null;
  affiliatePlatform: string | null;
  cpaCasino: number;
  cpaSportsbook: number;
  revenueSharePct: number;
  uniqueFeatures: string[];
  paymentMethods: string[];
  withdrawalSpeed: string;
  customerSupport: string[];
  loyaltyProgram: string | null;
  affiliateUrl: string | null;
  reviewHighlights: string;
  cons: string;
  tier: string;
  priority: number;
  affiliateWarning?: string;
  importantNote?: string;
}

export interface Casino {
  name: string;
  slug: string;
  company: string;
  type: string;
  alsoHasSportsbook: boolean;
  founded: number;
  softwareProviders: string[];
  numberOfSlots: number;
  numberOfTableGames: number;
  numberOfLiveDealerGames: number;
  hasPoker: boolean;
  welcomeBonus: string;
  welcomeBonusType: string;
  wageringRequirement: number;
  rtp: number;
  liveDealer: boolean;
  affiliateProgram: string | null;
  cpaCasino: number;
  revenueSharePct: number;
  affiliateUrl: string | null;
  paymentMethods: string[];
  withdrawalSpeed: string;
  loyaltyProgram: string | null;
  mobileApp: string;
  reviewHighlights: string;
  cons: string;
  legalStates: string[];
  tier: string;
  priority: number;
  affiliateWarning?: string;
}

export interface StateAvailability {
  state: string;
  sportsbooks: string[];
  casinos: string[];
  onlineCasino: boolean;
  onlineSportsbook: boolean;
  notes: string;
}

// ── Data accessors ──────────────────────────────────────────────────────────

export const states: State[] = (statesRaw as State[]).map((s) => ({
  ...s,
  regulatoryBody: s.regulatoryBody ?? "State Gaming Commission",
  notes: s.notes ?? "Online gambling regulations are evolving in this state.",
  selfExclusionProgram: s.selfExclusionProgram ?? null,
}));
export const sportsbooks: Sportsbook[] = sportsbooksRaw as Sportsbook[];
export const casinos: Casino[] = casinosRaw as Casino[];
export const availability: Record<string, StateAvailability> =
  availabilityRaw as unknown as Record<string, StateAvailability>;

export function getStateBySlug(slug: string): State | undefined {
  return states.find((s) => s.slug === slug);
}

export function getStateByAbbr(abbr: string): State | undefined {
  return states.find((s) => s.abbr === abbr);
}

export function getSportsbookBySlug(slug: string): Sportsbook | undefined {
  return sportsbooks.find((s) => s.slug === slug);
}

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((c) => c.slug === slug);
}

export function getAvailabilityForState(abbr: string): StateAvailability | undefined {
  return availability[abbr];
}

export function getSportsbooksForState(abbr: string): Sportsbook[] {
  const avail = availability[abbr];
  if (!avail || !avail.sportsbooks) return [];
  return avail.sportsbooks
    .map((slug) => sportsbooks.find((s) => s.slug === slug))
    .filter((s): s is Sportsbook => !!s);
}

export function getCasinosForState(abbr: string): Casino[] {
  const avail = availability[abbr];
  if (!avail || !avail.casinos) return [];
  return avail.casinos
    .map((slug) => casinos.find((c) => c.slug === slug))
    .filter((c): c is Casino => !!c);
}

export function getStatesForSportsbook(sportsbookSlug: string): State[] {
  return Object.entries(availability)
    .filter(([, avail]) => avail.sportsbooks?.includes(sportsbookSlug))
    .map(([abbr]) => getStateByAbbr(abbr))
    .filter((s): s is State => !!s)
    .sort((a, b) => b.priority - a.priority);
}

export function getStatesForCasino(casinoSlug: string): State[] {
  return Object.entries(availability)
    .filter(([, avail]) => avail.casinos?.includes(casinoSlug))
    .map(([abbr]) => getStateByAbbr(abbr))
    .filter((s): s is State => !!s);
}

export function getLegalStates(): State[] {
  return states.filter((s) => s.onlineSportsbookLegal || s.onlineCasinoLegal);
}

export function getIllegalStates(): State[] {
  return states.filter((s) => s.legalStatus === "illegal");
}

export function getStatesByRegion(): Record<string, State[]> {
  const regions: Record<string, State[]> = {};
  for (const state of states) {
    if (!regions[state.region]) regions[state.region] = [];
    regions[state.region].push(state);
  }
  return regions;
}

export function formatGGR(n: number | null): string {
  if (!n) return "N/A";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B/mo`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M/mo`;
  return `$${n.toLocaleString()}/mo`;
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return `${(n / 1_000).toFixed(0)}K`;
}

// Affiliate link helper — all go through /go/ for easy swapping
export function affiliateLink(operatorSlug: string): string {
  return `/go/${operatorSlug}/`;
}

// Star rating 1-5 from tier string
export function tierToRating(tier: string): number {
  switch (tier) {
    case "tier1": return 5;
    case "tier2": return 4;
    case "tier3": return 3;
    default: return 3;
  }
}
