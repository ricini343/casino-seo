/**
 * Auto Blog Post Generator — powered by OpenRouter
 * Usage: OPENROUTER_API_KEY=your_key npx tsx scripts/generate-post.ts
 *
 * Model options (set via OPENROUTER_MODEL env var):
 *   google/gemini-2.0-flash-001        ← default, ~$0.0005/post (very cheap)
 *   google/gemini-flash-1.5            ← also great, ultra cheap
 *   openai/gpt-4o-mini                 ← $0.003/post, reliable JSON
 *   anthropic/claude-haiku-4-5         ← $0.012/post, best quality
 *   anthropic/claude-sonnet-4          ← $0.08/post, premium quality
 *   meta-llama/llama-3.1-8b-instruct   ← often free on OpenRouter
 *
 * Picks the next unused topic, generates a full blog post, saves to
 * data/generated-posts.json. GitHub Actions commits → Vercel rebuilds.
 */

import * as fs from "fs";
import * as path from "path";

// Auto-load .env.local if present (for local dev without setting env manually)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join("=").trim();
    }
  }
}

// ─── Topic list ─────────────────────────────────────────────────
const TOPICS = [
  { keyword: "parlay betting tips for beginners",           category: "guides"   },
  { keyword: "NFL betting strategy tips",                   category: "strategy" },
  { keyword: "NBA parlay picks strategy",                   category: "strategy" },
  { keyword: "how to win at sports betting",                category: "strategy" },
  { keyword: "sports betting bankroll management",          category: "guides"   },
  { keyword: "best NFL betting systems",                    category: "strategy" },
  { keyword: "moneyline betting strategy explained",        category: "guides"   },
  { keyword: "over under betting tips",                     category: "guides"   },
  { keyword: "live betting strategy sports",                category: "strategy" },
  { keyword: "prop betting tips NFL",                       category: "strategy" },
  { keyword: "point spread betting guide beginners",        category: "guides"   },
  { keyword: "sports betting odds explained simply",        category: "guides"   },
  { keyword: "DraftKings vs FanDuel which is better",      category: "guides"   },
  { keyword: "BetMGM sportsbook review tips",               category: "guides"   },
  { keyword: "Caesars sportsbook promo codes guide",        category: "bonuses"  },
  { keyword: "best sports betting bonuses 2026",            category: "bonuses"  },
  { keyword: "no deposit sports betting bonus guide",       category: "bonuses"  },
  { keyword: "first bet insurance sports betting",          category: "bonuses"  },
  { keyword: "college football betting tips strategy",      category: "strategy" },
  { keyword: "MLB baseball betting guide beginners",        category: "guides"   },
  { keyword: "NHL hockey betting tips strategy",            category: "strategy" },
  { keyword: "soccer betting tips for US bettors",          category: "strategy" },
  { keyword: "UFC MMA betting tips strategy",               category: "strategy" },
  { keyword: "golf betting tips PGA tour",                  category: "strategy" },
  { keyword: "how to bet on horse racing online",           category: "guides"   },
  { keyword: "sports betting taxes USA how to report",     category: "guides"   },
  { keyword: "why do sportsbooks limit sharp bettors",      category: "guides"   },
  { keyword: "line shopping sports betting how to",         category: "strategy" },
  { keyword: "Kelly criterion sports betting explained",    category: "strategy" },
  { keyword: "closing line value CLV betting explained",    category: "strategy" },
  { keyword: "arbitrage betting how it works USA",          category: "strategy" },
  { keyword: "what is a teaser bet sports betting",         category: "guides"   },
  { keyword: "round robin parlay betting guide",            category: "guides"   },
  { keyword: "futures betting guide sports",                category: "guides"   },
  { keyword: "how to read a sports betting ticket",         category: "guides"   },
  { keyword: "online sports betting legal states list",     category: "news"     },
  { keyword: "New Jersey sports betting guide",             category: "guides"   },
  { keyword: "Pennsylvania online casino best games",       category: "guides"   },
  { keyword: "Michigan online gambling guide",              category: "guides"   },
  { keyword: "New York sports betting apps ranked",         category: "guides"   },
  { keyword: "Ohio sports betting review",                  category: "guides"   },
  { keyword: "Colorado sports betting guide",               category: "guides"   },
  { keyword: "Arizona sports betting apps",                 category: "guides"   },
  { keyword: "Illinois sports betting guide",               category: "guides"   },
  { keyword: "Indiana sports betting guide",                category: "guides"   },
  { keyword: "Virginia sports betting apps",                category: "guides"   },
];

// ─── Config ──────────────────────────────────────────────────────
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const PEXELS_KEY     = process.env.PEXELS_API_KEY;
const MODEL          = process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001";
const GENERATED_PATH = path.join(process.cwd(), "data", "generated-posts.json");

// ─── Helpers ─────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70);
}

function loadGenerated(): any[] {
  try {
    return JSON.parse(fs.readFileSync(GENERATED_PATH, "utf-8"));
  } catch {
    return [];
  }
}

// ─── Pexels image fetch ──────────────────────────────────────────
function buildPexelsQuery(keyword: string): string {
  const k = keyword.toLowerCase();
  // Sport-specific
  if (k.includes("nfl") || k.includes("football"))    return "american football game stadium";
  if (k.includes("nba") || k.includes("basketball"))  return "basketball court players";
  if (k.includes("mlb") || k.includes("baseball"))    return "baseball stadium game";
  if (k.includes("nhl") || k.includes("hockey"))      return "ice hockey players rink";
  if (k.includes("ufc") || k.includes("mma"))         return "mixed martial arts boxing ring";
  if (k.includes("golf") || k.includes("pga"))        return "golf player green course";
  if (k.includes("soccer"))                           return "soccer players football match";
  if (k.includes("horse") || k.includes("racing"))    return "horse racing jockey track";
  if (k.includes("casino"))                           return "casino roulette chips table";
  // Betting concept specific
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

/** Hash keyword to a page number (1–10) so same query → different Pexels page → unique photo */
function hashPage(keyword: string): number {
  let hash = 0;
  for (let i = 0; i < keyword.length; i++) hash = (hash * 31 + keyword.charCodeAt(i)) >>> 0;
  return (hash % 10) + 1;
}

async function fetchPexelsImage(keyword: string): Promise<{ imageUrl: string; imageAlt: string } | null> {
  if (!PEXELS_KEY) return null;
  try {
    const query = encodeURIComponent(buildPexelsQuery(keyword));
    const page  = hashPage(keyword);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=5&page=${page}&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    if (!res.ok) return null;
    const data = await res.json() as any;
    const photos = data?.photos;
    if (!photos?.length) {
      // fallback to page 1 if this page has no results
      const res2 = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=5&page=1&orientation=landscape`,
        { headers: { Authorization: PEXELS_KEY } }
      );
      if (!res2.ok) return null;
      const data2 = await res2.json() as any;
      const photo2 = data2?.photos?.[0];
      if (!photo2) return null;
      return { imageUrl: photo2.src.large, imageAlt: photo2.alt || keyword };
    }
    return {
      imageUrl: photos[0].src.large,
      imageAlt: photos[0].alt || keyword,
    };
  } catch {
    return null;
  }
}

// ─── OpenRouter API call ─────────────────────────────────────────
async function callOpenRouter(systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://www.betstateusa.com",
      "X-Title": "BetStateUSA Blog Generator",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt   },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json() as any;
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from OpenRouter");
  return text.trim();
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
  if (!OPENROUTER_KEY) {
    console.error("❌  OPENROUTER_API_KEY env var is required");
    process.exit(1);
  }

  const existing = loadGenerated();
  const existingSlugs = new Set(existing.map((p: any) => p.slug));

  const topic = TOPICS.find((t) => !existingSlugs.has(slugify(t.keyword)));
  if (!topic) {
    console.log("✅  All topics already generated. Add more to TOPICS list.");
    process.exit(0);
  }

  const slug = slugify(topic.keyword);
  const today = new Date().toISOString().split("T")[0];

  console.log(`📝  Generating: "${topic.keyword}"`);
  console.log(`🤖  Model: ${MODEL}`);

  const systemPrompt = `You are an expert US sports betting content writer for BetStateUSA.com.
You write high-quality, SEO-optimized articles that rank on Google.
You always output valid JSON matching the exact schema provided.
Never use placeholder text. Write real, expert-level, actionable content.
Target audience: US sports bettors, beginners to intermediate.`;

  const userPrompt = `Write a complete blog post targeting the keyword: "${topic.keyword}"

Output a single valid JSON object with this exact structure:

{
  "slug": "${slug}",
  "title": "string — compelling, keyword-rich, 50-70 chars",
  "metaTitle": "string — 60-70 chars, include keyword + 2026",
  "metaDescription": "string — 140-160 chars, include keyword naturally",
  "date": "${today}",
  "category": "${topic.category}",
  "excerpt": "string — 2 sentences, engaging summary of the article",
  "readingTime": number,
  "author": "BetStateUSA Editorial",
  "content": [ ...BlogSection objects ]
}

BlogSection types — use a varied mix, aim for 14-18 sections:
{ "type": "p",       "text": "paragraph" }
{ "type": "h2",      "text": "heading" }
{ "type": "h3",      "text": "subheading" }
{ "type": "ul",      "items": ["item 1", "item 2", "item 3"] }
{ "type": "ol",      "items": ["step 1", "step 2", "step 3"] }
{ "type": "table",   "headers": ["Col A", "Col B"], "rows": [["val", "val"]] }
{ "type": "callout", "text": "highlighted tip or action" }
{ "type": "code",    "text": "formula or math example", "caption": "label" }

Hard requirements:
- Start with a "p" intro paragraph that naturally includes the keyword
- At least 1200 words of real content total
- At least 1 table with at least 4 rows of real data
- At least 1 ol or ul with at least 4 items
- Mention US sportsbooks (DraftKings, FanDuel, BetMGM, Caesars, ESPN Bet) naturally
- End with a "callout" pointing to one of: /tools/parlay-calculator/ /tools/odds-converter/ /tools/betting-calculator/ /tools/ev-calculator/
- Every sentence must be genuinely useful — no filler or padding

Output ONLY the raw JSON. No markdown fences. No explanation text. Just the JSON object.`;

  let rawContent: string;
  try {
    rawContent = await callOpenRouter(systemPrompt, userPrompt);
  } catch (err) {
    console.error("❌  API error:", err);
    process.exit(1);
  }

  // Strip any accidental markdown fences
  rawContent = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let post: any;
  try {
    post = JSON.parse(rawContent);
  } catch {
    console.error("❌  Failed to parse JSON — raw response (first 600 chars):");
    console.error(rawContent.slice(0, 600));
    process.exit(1);
  }

  // Enforce required fields
  post.slug     = slug;
  post.date     = today;
  post.author   = "BetStateUSA Editorial";
  post.category = post.category || topic.category;

  // Fetch image from Pexels
  const image = await fetchPexelsImage(topic.keyword);
  if (image) {
    post.imageUrl = image.imageUrl;
    post.imageAlt = image.imageAlt;
    console.log(`🖼️  Image: ${image.imageUrl.slice(0, 60)}...`);
  } else {
    console.log("🖼️  No image (PEXELS_API_KEY not set or fetch failed)");
  }

  existing.unshift(post); // newest first
  fs.writeFileSync(GENERATED_PATH, JSON.stringify(existing, null, 2));

  console.log(`✅  Done: "${post.title}"`);
  console.log(`📄  Slug: /blog/${slug}/`);
  console.log(`🗂️  Total generated posts: ${existing.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
