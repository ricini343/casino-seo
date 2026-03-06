/**
 * Backfill images for existing posts that don't have imageUrl yet.
 * Usage:
 *   npx tsx scripts/backfill-images.ts          ← only posts missing images
 *   npx tsx scripts/backfill-images.ts --force  ← re-fetch images for ALL posts
 */

import * as fs from "fs";
import * as path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join("=").trim();
    }
  }
}

const PEXELS_KEY     = process.env.PEXELS_API_KEY;
const GENERATED_PATH = path.join(process.cwd(), "data", "generated-posts.json");
const FORCE          = process.argv.includes("--force");

function buildPexelsQuery(keyword: string): string {
  const k = keyword.toLowerCase();
  if (k.includes("nfl") || k.includes("football"))    return "american football game stadium";
  if (k.includes("nba") || k.includes("basketball"))  return "basketball court players";
  if (k.includes("mlb") || k.includes("baseball"))    return "baseball stadium game";
  if (k.includes("nhl") || k.includes("hockey"))      return "ice hockey players rink";
  if (k.includes("ufc") || k.includes("mma"))         return "mixed martial arts boxing ring";
  if (k.includes("golf") || k.includes("pga"))        return "golf player green course";
  if (k.includes("soccer"))                           return "soccer players football match";
  if (k.includes("horse") || k.includes("racing"))    return "horse racing jockey track";
  if (k.includes("casino"))                           return "casino roulette chips table";
  if (k.includes("parlay"))                           return "sports betting ticket slip";
  if (k.includes("bankroll") || k.includes("money management")) return "money cash finance stack";
  if (k.includes("moneyline") || k.includes("money line")) return "sports odds scoreboard";
  if (k.includes("over under") || k.includes("totals")) return "scoreboard sports total points";
  if (k.includes("point spread") || k.includes("spread")) return "football scoreboard halftime";
  if (k.includes("live betting") || k.includes("in-play")) return "sports crowd stadium live";
  if (k.includes("prop") || k.includes("player prop")) return "athlete player performance";
  if (k.includes("futures"))                          return "trophy sports championship winner";
  if (k.includes("arbitrage") || k.includes("arb"))  return "phone app sports odds comparison";
  if (k.includes("kelly") || k.includes("criterion")) return "sports analytics data statistics";
  if (k.includes("closing line") || k.includes("clv")) return "sports data analysis chart";
  if (k.includes("teaser") || k.includes("round robin")) return "american football fans stadium";
  if (k.includes("bonus") || k.includes("promo") || k.includes("free bet")) return "phone mobile app betting bonus";
  if (k.includes("odds") || k.includes("how to read")) return "sports odds betting board screen";
  if (k.includes("strategy") || k.includes("tips") || k.includes("win")) return "sports coach strategy whiteboard";
  if (k.includes("guide") || k.includes("beginners") || k.includes("explained")) return "smartphone sports betting app";
  if (k.includes("tax") || k.includes("legal") || k.includes("law")) return "legal document law gavel";
  if (k.includes("draftkings") || k.includes("fanduel") || k.includes("sportsbook")) return "sports betting mobile phone app";
  if (k.includes("new jersey") || k.includes("new york") || k.includes("pennsylvania") ||
      k.includes("michigan") || k.includes("ohio") || k.includes("colorado") ||
      k.includes("arizona") || k.includes("illinois") || k.includes("virginia")) return "city skyline usa downtown";
  return "sports stadium crowd";
}

function pickIndex(keyword: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < keyword.length; i++) hash = (hash * 31 + keyword.charCodeAt(i)) >>> 0;
  return hash % max;
}

async function fetchImage(keyword: string): Promise<{ imageUrl: string; imageAlt: string } | null> {
  if (!PEXELS_KEY) return null;
  try {
    const query = encodeURIComponent(buildPexelsQuery(keyword));
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=15&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    if (!res.ok) return null;
    const data = await res.json() as any;
    const photos = data?.photos;
    if (!photos?.length) return null;
    const photo = photos[pickIndex(keyword, photos.length)];
    return { imageUrl: photo.src.large, imageAlt: photo.alt || keyword };
  } catch {
    return null;
  }
}

async function main() {
  if (!PEXELS_KEY) {
    console.error("❌  PEXELS_API_KEY not found in .env.local");
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(GENERATED_PATH, "utf-8")) as any[];
  const targets = FORCE ? posts : posts.filter((p) => !p.imageUrl);

  if (targets.length === 0) {
    console.log("✅  All posts already have images. Use --force to re-fetch.");
    return;
  }

  console.log(`🖼️  ${FORCE ? "Re-fetching" : "Backfilling"} images for ${targets.length} posts...`);

  for (const post of targets) {
    const keyword = post.slug.replace(/-/g, " ");
    const image = await fetchImage(keyword);
    if (image) {
      post.imageUrl = image.imageUrl;
      post.imageAlt = image.imageAlt;
      console.log(`  ✅  ${post.slug}`);
    } else {
      console.log(`  ⚠️  No image found for: ${post.slug}`);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  fs.writeFileSync(GENERATED_PATH, JSON.stringify(posts, null, 2));
  console.log(`✅  Done. ${targets.length} posts updated.`);
}

main().catch(console.error);
