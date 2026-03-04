import type { MetadataRoute } from "next";
import { states, sportsbooks, casinos } from "@/lib/data";
import { SITE } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/sportsbooks/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/casinos/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/states/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/bonuses/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/compare/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/parlay-calculator/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/odds-converter/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/betting-calculator/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/ev-calculator/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // State pages
  const statePages: MetadataRoute.Sitemap = states.flatMap((s) => {
    const pages: MetadataRoute.Sitemap = [
      { url: `${base}/states/${s.slug}/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/states/${s.slug}/legal-guide/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];
    if (s.onlineSportsbookLegal) {
      pages.push({
        url: `${base}/states/${s.slug}/best-sportsbooks/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    if (s.onlineCasinoLegal) {
      pages.push({
        url: `${base}/states/${s.slug}/best-online-casinos/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    return pages;
  });

  // Sportsbook review pages
  const sbPages: MetadataRoute.Sitemap = sportsbooks.flatMap((sb) => [
    { url: `${base}/sportsbooks/${sb.slug}/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/sportsbooks/${sb.slug}/promo-code/`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
  ]);

  // Casino review pages
  const casinoPages: MetadataRoute.Sitemap = casinos.flatMap((c) => [
    { url: `${base}/casinos/${c.slug}/`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/casinos/${c.slug}/promo-code/`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
  ]);

  // Comparison pages
  const sbPairs: MetadataRoute.Sitemap = [];
  const filteredSbs = sportsbooks.filter((s) => s.tier !== "tier3");
  for (let i = 0; i < filteredSbs.length; i++) {
    for (let j = i + 1; j < filteredSbs.length; j++) {
      sbPairs.push({
        url: `${base}/compare/${filteredSbs[i].slug}-vs-${filteredSbs[j].slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  const casinoPairs: MetadataRoute.Sitemap = [];
  const filteredCasinos = casinos.filter((c) => c.tier !== "tier3");
  for (let i = 0; i < filteredCasinos.length; i++) {
    for (let j = i + 1; j < filteredCasinos.length; j++) {
      casinoPairs.push({
        url: `${base}/compare/${filteredCasinos[i].slug}-vs-${filteredCasinos[j].slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return [
    ...staticPages,
    ...statePages,
    ...sbPages,
    ...casinoPages,
    ...sbPairs,
    ...casinoPairs,
  ];
}
