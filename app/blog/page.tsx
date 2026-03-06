import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { allBlogPosts as blogPosts, categoryColors } from "@/data/blog-posts";
import { SITE } from "@/site.config";

export const metadata: Metadata = {
  title: `Sports Betting Blog — Strategy, Guides & Tips | ${SITE.name}`,
  description:
    "Sports betting guides, parlay strategy, odds explained, and state-by-state legal updates. Expert tips from the BetStateUSA editorial team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "0.5rem" }}>
            Sports Betting Blog
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.0625rem", margin: 0, maxWidth: "560px" }}>
            Strategy guides, odds explainers, parlay tips, and state gambling news. Updated regularly by the BetStateUSA team.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}/`} style={{ textDecoration: "none", display: "block", marginBottom: "2.5rem" }}>
          <div
            className="card card-hover"
            style={{
              overflow: "hidden",
              border: "1px solid rgba(0,255,135,0.2)",
              padding: 0,
            }}
          >
            {/* Featured image */}
            {(featured as any).imageUrl && (
              <div style={{ width: "100%", height: "260px", overflow: "hidden" }}>
                <img
                  src={(featured as any).imageUrl}
                  alt={(featured as any).imageAlt || featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <div
              style={{
                padding: "1.75rem 2rem",
                background: "linear-gradient(135deg, rgba(0,255,135,0.04) 0%, rgba(255,215,0,0.03) 100%)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "0.25rem 0.625rem",
                    background: categoryColors[featured.category].bg,
                    border: `1px solid ${categoryColors[featured.category].border}`,
                    borderRadius: "9999px",
                    color: categoryColors[featured.category].text,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {featured.category}
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.625rem",
                    background: "rgba(0,255,135,0.08)",
                    border: "1px solid rgba(0,255,135,0.2)",
                    borderRadius: "9999px",
                    color: "var(--green)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Featured
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                  {formatDate(featured.date)} · {featured.readingTime} min read
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                {featured.title}
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", margin: "0 0 1rem", maxWidth: "680px" }}>
                {featured.excerpt}
              </p>
              <span style={{ color: "var(--green)", fontWeight: 600, fontSize: "0.875rem" }}>
                Read article →
              </span>
            </div>
          </div>
        </Link>

        {/* Rest of posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => {
            const cat = categoryColors[post.category];
            const img = (post as any).imageUrl;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}/`} style={{ textDecoration: "none" }}>
                <div className="card card-hover" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}>
                  {/* Card image */}
                  {img ? (
                    <div style={{ width: "100%", height: "160px", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={img}
                        alt={(post as any).imageAlt || post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%", height: "100px", flexShrink: 0,
                        background: `linear-gradient(135deg, ${cat.bg.replace("0.1", "0.25")}, rgba(0,0,0,0.3))`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "2rem",
                      }}
                    >
                      {post.category === "strategy" ? "🏆" : post.category === "bonuses" ? "🎁" : post.category === "news" ? "📰" : "📖"}
                    </div>
                  )}
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          background: cat.bg,
                          border: `1px solid ${cat.border}`,
                          borderRadius: "9999px",
                          color: cat.text,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "capitalize",
                        }}
                      >
                        {post.category}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
                        {formatDate(post.date)} · {post.readingTime}m
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.35, fontSize: "0.9375rem", flex: 1 }}>
                      {post.title}
                    </h3>
                    <span style={{ color: "var(--green)", fontWeight: 600, fontSize: "0.8125rem" }}>
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
