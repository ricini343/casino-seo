"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/site.config";
import { getStatesByRegion } from "@/lib/data";

const states = getStatesByRegion();

const navLinks = [
  { label: "States", href: "/states/", hasDropdown: true },
  { label: "Casinos", href: "/casinos/" },
  { label: "Sportsbooks", href: "/sportsbooks/" },
  { label: "Tools", href: "/tools/" },
  { label: "Bonuses", href: "/bonuses/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "rgba(10,14,26,0.97)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline" style={{ gap: "0.625rem" }}>
            {/* Icon mark — shield + upward chart */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5 4 9.5 8 11 4-1.5 8-6 8-11V6L12 2z"
                fill="rgba(0,255,135,0.12)"
                stroke="#00FF87"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <polyline
                points="7.5 14.5 10.5 10.5 13 12.5 16.5 8"
                stroke="#00FF87"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Wordmark */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>
                Bet
              </span>
              <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--green)", letterSpacing: "-0.5px" }}>
                State
              </span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginLeft: "3px", alignSelf: "flex-start", marginTop: "5px" }}>
                USA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setStatesOpen(true)}
                  onMouseLeave={() => setStatesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onFocus={() => setStatesOpen(true)}
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </button>
                  {statesOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-x-6 gap-y-1"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        width: "480px",
                        maxHeight: "70vh",
                        overflowY: "auto",
                      }}
                    >
                      {Object.entries(states).map(([region, stateList]) => (
                        <div key={region}>
                          <div
                            className="text-xs font-700 uppercase tracking-wider mb-1 px-2"
                            style={{ color: "var(--green)", fontWeight: 700 }}
                          >
                            {region}
                          </div>
                          {stateList.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/states/${s.slug}/`}
                              className="block px-2 py-1 rounded text-sm transition-colors"
                              style={{ color: "var(--text-muted)" }}
                              onClick={() => setStatesOpen(false)}
                            >
                              {s.name}
                              {s.onlineSportsbookLegal && (
                                <span style={{ color: "var(--green)", marginLeft: "4px", fontSize: "10px" }}>✓</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools/parlay-calculator/"
              className="hidden sm:inline-flex btn-primary text-sm py-2 px-4"
              style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}
            >
              Parlay Calc
            </Link>
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-1"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-3 py-2 rounded-lg text-base font-medium"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/tools/parlay-calculator/"
              className="btn-primary w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Parlay Calculator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
