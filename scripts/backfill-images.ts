/**
 * Backfill images for existing posts that don't have imageUrl yet.
 * Usage: npx tsx scripts/backfill-images.ts
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

function buildPexelsQuery(keyword: string): string {
  const k = keyword.toLowerCase();
  if (k.includes("nfl") || k.includes("football"))   return "american football stadium";
  if (k.includes("nba") || k.includes("basketball")) return "basketball court nba";
  if (k.includes("mlb") || k.includes("baseball"))   return "baseball stadium";
  if (k.includes("nhl") || k.includes("hockey"))     return "ice hockey rink";
  if (k.includes("ufc") || k.includes("mma"))        return "mixed martial arts fight";
  if (k.includes("golf") || k.includes("pga"))       return "golf course green";
  if (k.includes("soccer"))                          return "soccer football stadium";
  if (k.includes("horse"))                           return "horse racing track";
  if (k.includes("casino"))                          return "casino chips cards table";
  if (k.includes("parlay"))                          return "sports betting odds board";
  return "sports stadium betting";
}

async function fetchImage(keyword: string): Promise<{ imageUrl: string; imageAlt: string } | null> {
  if (!PEXELS_KEY) return null;
  try {
    const query = encodeURIComponent(buildPexelsQuery(keyword));
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=5&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    if (!res.ok) return null;
    const data = await res.json() as any;
    const photo = data?.photos?.[0];
    if (!photo) return null;
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
  const missing = posts.filter((p) => !p.imageUrl);

  if (missing.length === 0) {
    console.log("✅  All posts already have images.");
    return;
  }

  console.log(`🖼️  Backfilling images for ${missing.length} posts...`);

  for (const post of missing) {
    const keyword = post.slug.replace(/-/g, " ");
    const image = await fetchImage(keyword);
    if (image) {
      post.imageUrl = image.imageUrl;
      post.imageAlt = image.imageAlt;
      console.log(`  ✅  ${post.slug}`);
    } else {
      console.log(`  ⚠️  No image found for: ${post.slug}`);
    }
    // Pexels free tier: 200 req/hour — small delay to be safe
    await new Promise((r) => setTimeout(r, 300));
  }

  fs.writeFileSync(GENERATED_PATH, JSON.stringify(posts, null, 2));
  console.log(`✅  Done. ${missing.length} posts updated.`);
}

main().catch(console.error);
