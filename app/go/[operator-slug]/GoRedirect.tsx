"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "@/components/SiteIcon";

const AFFILIATE_URLS: Record<string, string> = {
  // Sportsbooks
  "draftkings": "https://affiliates.draftkings.com",
  "fanduel": "https://partners.fanduel.com",
  "betmgm": "https://www.betmgmpartners.com",
  "caesars": "https://www.caesarsaffiliates.com",
  "bet365": "https://partners.bet365.com",
  "thescorebet": "https://www.pennentertainment.com/affiliates",
  "hard-rock-bet": "https://hardrock.bet/affiliates",
  "fanatics": "https://www.fanatics.com/affiliates",
  "unibet": "https://kindredaffiliates.com",
  // Casinos
  "betmgm-casino": "https://www.betmgmpartners.com",
  "draftkings-casino": "https://affiliates.draftkings.com",
  "fanduel-casino": "https://partners.fanduel.com",
  "caesars-palace-casino": "https://www.caesarsaffiliates.com",
  "golden-nugget-casino": "https://affiliates.draftkings.com",
  "borgata-casino": "https://www.betmgmpartners.com",
  "hard-rock-casino": "https://hardrock.bet/affiliates",
  "unibet-casino": "https://kindredaffiliates.com",
};

interface Props {
  slug: string;
}

export default function GoRedirect({ slug }: Props) {
  const url = AFFILIATE_URLS[slug];

  useEffect(() => {
    if (url) {
      window.location.replace(url);
    }
  }, [url]);

  const displayName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (!url) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ color: "#ffa500", marginBottom: "1rem" }}><AlertTriangle size={52} /></div>
        <h1 style={{ fontWeight: 800, marginBottom: "0.5rem" }}>Operator Not Found</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The operator &quot;{displayName}&quot; was not found.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/sportsbooks/" className="btn-primary">View Sportsbooks</Link>
          <Link href="/casinos/" className="btn-outline">View Casinos</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "3px solid var(--green)",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          marginBottom: "1.5rem",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <h1 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Redirecting to {displayName}...
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
        You&apos;re being taken to the official site. If nothing happens,{" "}
        <a href={url} rel="nofollow sponsored noopener noreferrer" style={{ color: "var(--green)" }}>
          click here
        </a>
        .
      </p>
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "480px", lineHeight: "1.6" }}>
        21+. Gambling problem? Call 1-800-522-4700.
        This site may receive compensation from licensed operators.
      </p>
    </div>
  );
}
