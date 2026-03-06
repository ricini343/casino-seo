/**
 * Auto Blog Post Generator
 * Usage: npx tsx scripts/generate-post.ts
 * Env:   ANTHROPIC_API_KEY required
 *
 * Picks the next unused topic from TOPICS list,
 * asks Claude to write a full blog post in JSON format,
 * appends it to data/generated-posts.json.
 * GitHub Actions commits + pushes → Vercel rebuilds automatically.
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// ─── Topic list ────────────────────────────────────────────────
// Add more anytime. Already-used slugs are skipped automatically.
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

// ─── Helpers ────────────────────────────────────────────────────
const GENERATED_PATH = path.join(process.cwd(), "data", "generated-posts.json");

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

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌  ANTHROPIC_API_KEY env var is required");
    process.exit(1);
  }

  const existing = loadGenerated();
  const existingSlugs = new Set(existing.map((p: any) => p.slug));

  // Find next unused topic
  const topic = TOPICS.find((t) => !existingSlugs.has(slugify(t.keyword)));
  if (!topic) {
    console.log("✅  All topics already generated. Add more to TOPICS list.");
    process.exit(0);
  }

  const slug = slugify(topic.keyword);
  const today = new Date().toISOString().split("T")[0];

  console.log(`📝  Generating post for: "${topic.keyword}" (slug: ${slug})`);

  const client = new Anthropic({ apiKey });

  const systemPrompt = `You are an expert US sports betting content writer for BetStateUSA.com.
You write high-quality, SEO-optimized articles that rank on Google.
You always output valid JSON matching the exact schema provided.
Never use placeholder text. Write real, useful, expert-level content.
Target audience: US sports bettors, beginners to intermediate.`;

  const userPrompt = `Write a complete blog post targeting the keyword: "${topic.keyword}"

Output a single valid JSON object matching this TypeScript interface exactly:

{
  "slug": "${slug}",
  "title": "string (compelling, keyword-rich, 50-70 chars)",
  "metaTitle": "string (60-70 chars, include keyword + year 2026)",
  "metaDescription": "string (140-160 chars, include keyword)",
  "date": "${today}",
  "category": "${topic.category}",
  "excerpt": "string (2 sentences, engaging summary)",
  "readingTime": number (estimated minutes to read),
  "author": "BetStateUSA Editorial",
  "content": [BlogSection]
}

BlogSection types (use a good mix, aim for 12-18 sections total):
- { "type": "p", "text": "paragraph text" }
- { "type": "h2", "text": "heading" }
- { "type": "h3", "text": "subheading" }
- { "type": "ul", "items": ["item1", "item2"] }
- { "type": "ol", "items": ["step1", "step2"] }
- { "type": "table", "headers": ["Col1","Col2"], "rows": [["r1c1","r1c2"]] }
- { "type": "callout", "text": "highlighted tip or CTA" }
- { "type": "code", "text": "formula or example", "caption": "optional label" }

Requirements:
- 1000-1500 words of real content (count the text, not sections)
- Start with an engaging intro paragraph (no h2 at the top)
- Include at least 1 table with useful data
- Include at least 1 ordered or unordered list with 4+ items
- End with a callout pointing readers to one of our tools (/tools/parlay-calculator/, /tools/odds-converter/, /tools/betting-calculator/, or /tools/ev-calculator/)
- Use keyword "${topic.keyword}" naturally in first paragraph and at least 2 h2 headings
- Write for US audience, mention US sportsbooks (DraftKings, FanDuel, BetMGM, Caesars, ESPN Bet) where relevant
- No filler content. Every sentence must be useful to the reader.

Output ONLY the raw JSON object. No markdown code fences. No explanation. Just the JSON.`;

  let rawContent = "";
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: userPrompt }],
      system: systemPrompt,
    });

    const block = message.content[0];
    if (block.type !== "text") {
      throw new Error("Unexpected response type");
    }
    rawContent = block.text.trim();
  } catch (err) {
    console.error("❌  Claude API error:", err);
    process.exit(1);
  }

  // Clean up any accidental markdown fences
  rawContent = rawContent.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");

  let post: any;
  try {
    post = JSON.parse(rawContent);
  } catch (err) {
    console.error("❌  Failed to parse JSON from Claude response");
    console.error("Raw content (first 500 chars):", rawContent.slice(0, 500));
    process.exit(1);
  }

  // Ensure required fields
  post.slug = slug;
  post.date = today;
  post.author = post.author || "BetStateUSA Editorial";
  post.category = post.category || topic.category;

  // Append to generated-posts.json
  existing.unshift(post); // newest first
  fs.writeFileSync(GENERATED_PATH, JSON.stringify(existing, null, 2));

  console.log(`✅  Post generated: "${post.title}"`);
  console.log(`📄  Slug: ${slug}`);
  console.log(`🗂️  Total generated posts: ${existing.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
