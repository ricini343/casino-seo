import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { blogPosts, getBlogPost, categoryColors, type BlogSection } from "@/data/blog-posts";
import { SITE } from "@/site.config";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={i} style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text-primary)", margin: "2rem 0 0.75rem", lineHeight: 1.3 }}>
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.625rem" }}>
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "1rem" }}>
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} style={{ color: "var(--text-secondary)", lineHeight: "2", paddingLeft: "1.25rem", marginBottom: "1rem" }}>
          {section.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} style={{ color: "var(--text-secondary)", lineHeight: "2", paddingLeft: "1.25rem", marginBottom: "1rem" }}>
          {section.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div key={i} style={{ overflowX: "auto", marginBottom: "1.25rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                {section.headers.map((h, j) => <th key={j}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, j) => (
                <tr key={j}>
                  {row.map((cell, k) => (
                    <td key={k} style={{ color: k === 0 ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: k === 0 ? 600 : 400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div key={i} className="highlight-box" style={{ margin: "1.5rem 0" }}>
          <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: "1.7" }}>{section.text}</p>
        </div>
      );
    case "code":
      return (
        <div key={i} style={{ marginBottom: "1.25rem" }}>
          <div
            className="card"
            style={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              color: "var(--green)",
              padding: "1rem",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {section.text}
          </div>
          {section.caption && (
            <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.375rem", paddingLeft: "0.25rem" }}>
              {section.caption}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const cat = categoryColors[post.category];
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog/" },
              { label: post.title },
            ]}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "0.25rem 0.625rem",
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                borderRadius: "9999px",
                color: cat.text,
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              {post.category}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>· {post.readingTime} min read</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, marginBottom: "1rem", lineHeight: 1.25 }}>
            {post.title}
          </h1>
          {/* Author byline */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "linear-gradient(135deg, #00FF87, #FFD700)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 900, color: "#0a0e1a",
              }}
            >
              B
            </div>
            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" }}>{post.author}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Expert reviewed · Independent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <article>
          {post.content.map((section, i) => renderSection(section, i))}
        </article>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section style={{ marginTop: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <h2 className="section-title">More from the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherPosts.map((p) => {
                const pc = categoryColors[p.category];
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}/`} style={{ textDecoration: "none" }}>
                    <div className="card card-hover" style={{ padding: "1rem", height: "100%" }}>
                      <span
                        style={{
                          display: "inline-block", marginBottom: "0.5rem",
                          padding: "0.2rem 0.5rem",
                          background: pc.bg, border: `1px solid ${pc.border}`,
                          borderRadius: "9999px", color: pc.text,
                          fontSize: "0.7rem", fontWeight: 700, textTransform: "capitalize",
                        }}
                      >
                        {p.category}
                      </span>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem", lineHeight: 1.35 }}>
                        {p.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="highlight-box" style={{ marginTop: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                Ready to use our free betting tools?
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                Parlay calculator, odds converter, EV calculator — all free, no signup.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/tools/parlay-calculator/" className="btn-primary" style={{ fontSize: "0.875rem" }}>
                Parlay Calculator
              </Link>
              <Link href="/tools/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
                All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
