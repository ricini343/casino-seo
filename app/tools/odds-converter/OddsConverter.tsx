"use client";

import { useState, useEffect } from "react";

type OddsFormat = "american" | "decimal" | "fractional";

function americanToDecimal(n: number): number {
  if (n >= 0) return n / 100 + 1;
  return 100 / Math.abs(n) + 1;
}

function decimalToAmerican(d: number): number {
  if (d >= 2) return (d - 1) * 100;
  return -100 / (d - 1);
}

function decimalToFractional(d: number): string {
  const raw = d - 1;
  if (Math.abs(raw) < 0.001) return "0/1";
  // Approximate fraction
  const tolerance = 0.0001;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = raw;
  for (let i = 0; i < 64; i++) {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    if (Math.abs(raw - h1 / k1) < tolerance) break;
    b = 1 / (b - a);
  }
  return `${h1}/${k1}`;
}

function fractionalToDecimal(frac: string): number | null {
  const parts = frac.split(/[\/\-]/);
  if (parts.length !== 2) return null;
  const n = parseFloat(parts[0]);
  const d = parseFloat(parts[1]);
  if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d + 1;
  return null;
}

function impliedProb(decimal: number): number {
  if (decimal <= 0) return 0;
  return (1 / decimal) * 100;
}

function formatAmerican(n: number): string {
  if (n >= 0) return `+${Math.round(n)}`;
  return `${Math.round(n)}`;
}

export default function OddsConverter() {
  const [activeFormat, setActiveFormat] = useState<OddsFormat>("american");
  const [americanVal, setAmericanVal] = useState("+150");
  const [decimalVal, setDecimalVal] = useState("2.50");
  const [fractionalVal, setFractionalVal] = useState("3/2");
  const [error, setError] = useState("");

  function convertFromAmerican(val: string) {
    const n = parseFloat(val);
    if (isNaN(n)) { setError("Invalid American odds"); return; }
    setError("");
    const d = americanToDecimal(n);
    setDecimalVal(d.toFixed(3));
    setFractionalVal(decimalToFractional(d));
  }

  function convertFromDecimal(val: string) {
    const d = parseFloat(val);
    if (isNaN(d) || d < 1) { setError("Decimal odds must be ≥ 1.0"); return; }
    setError("");
    const a = decimalToAmerican(d);
    setAmericanVal(formatAmerican(a));
    setFractionalVal(decimalToFractional(d));
  }

  function convertFromFractional(val: string) {
    const d = fractionalToDecimal(val);
    if (!d) { setError("Use format like 3/2 or 11/10"); return; }
    setError("");
    const a = decimalToAmerican(d);
    setAmericanVal(formatAmerican(a));
    setDecimalVal(d.toFixed(3));
  }

  useEffect(() => {
    if (activeFormat === "american") convertFromAmerican(americanVal);
    else if (activeFormat === "decimal") convertFromDecimal(decimalVal);
    else convertFromFractional(fractionalVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFormat]);

  const currentDecimal = parseFloat(decimalVal) || 1;
  const prob = impliedProb(currentDecimal);

  const tabs: { label: string; format: OddsFormat; placeholder: string }[] = [
    { label: "American (+/-)", format: "american", placeholder: "+150" },
    { label: "Decimal", format: "decimal", placeholder: "2.50" },
    { label: "Fractional", format: "fractional", placeholder: "3/2" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.format}
            onClick={() => setActiveFormat(tab.format)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: `1.5px solid ${activeFormat === tab.format ? "var(--green)" : "var(--border-light)"}`,
              background: activeFormat === tab.format ? "rgba(0,255,135,0.1)" : "transparent",
              color: activeFormat === tab.format ? "var(--green)" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ marginBottom: "1.5rem" }}>
        {activeFormat === "american" && (
          <div>
            <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              American Odds (e.g. +150, -110)
            </label>
            <input
              type="text"
              className="input-field"
              value={americanVal}
              onChange={(e) => { setAmericanVal(e.target.value); convertFromAmerican(e.target.value); }}
              placeholder="+150"
              style={{ maxWidth: "240px", fontSize: "1.25rem", fontWeight: 700 }}
            />
          </div>
        )}
        {activeFormat === "decimal" && (
          <div>
            <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Decimal Odds (e.g. 2.50)
            </label>
            <input
              type="number"
              className="input-field"
              value={decimalVal}
              onChange={(e) => { setDecimalVal(e.target.value); convertFromDecimal(e.target.value); }}
              placeholder="2.50"
              step="0.001"
              min="1"
              style={{ maxWidth: "240px", fontSize: "1.25rem", fontWeight: 700 }}
            />
          </div>
        )}
        {activeFormat === "fractional" && (
          <div>
            <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Fractional Odds (e.g. 3/2, 11/10)
            </label>
            <input
              type="text"
              className="input-field"
              value={fractionalVal}
              onChange={(e) => { setFractionalVal(e.target.value); convertFromFractional(e.target.value); }}
              placeholder="3/2"
              style={{ maxWidth: "240px", fontSize: "1.25rem", fontWeight: 700 }}
            />
          </div>
        )}
        {error && <p style={{ color: "#ef4444", fontSize: "0.8125rem", marginTop: "0.375rem" }}>{error}</p>}
      </div>

      {/* Results */}
      {!error && currentDecimal > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "American", value: americanVal, color: parseFloat(americanVal) >= 0 ? "var(--green)" : "#ef4444" },
            { label: "Decimal", value: decimalVal, color: "var(--gold)" },
            { label: "Fractional", value: fractionalVal, color: "var(--text-primary)" },
            { label: "Implied Probability", value: `${prob.toFixed(2)}%`, color: "var(--text-primary)" },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: "0.625rem",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
                {r.label}
              </div>
              <div style={{ color: r.color, fontSize: "1.5rem", fontWeight: 900 }}>{r.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick reference table */}
      <div style={{ marginTop: "2rem", overflowX: "auto" }}>
        <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.625rem" }}>
          Common Odds Reference Table
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>American</th>
              <th>Decimal</th>
              <th>Fractional</th>
              <th>Implied Prob</th>
              <th>$100 Profit</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["-200", "1.500", "1/2", "66.7%", "+$50"],
              ["-150", "1.667", "2/3", "60.0%", "+$67"],
              ["-120", "1.833", "5/6", "54.5%", "+$83"],
              ["-110", "1.909", "10/11", "52.4%", "+$91"],
              ["+100", "2.000", "1/1 (Evens)", "50.0%", "+$100"],
              ["+110", "2.100", "11/10", "47.6%", "+$110"],
              ["+120", "2.200", "6/5", "45.5%", "+$120"],
              ["+150", "2.500", "3/2", "40.0%", "+$150"],
              ["+200", "3.000", "2/1", "33.3%", "+$200"],
              ["+300", "4.000", "3/1", "25.0%", "+$300"],
              ["+500", "6.000", "5/1", "16.7%", "+$500"],
              ["+1000", "11.000", "10/1", "9.1%", "+$1,000"],
            ].map((row) => (
              <tr key={row[0]}>
                <td style={{ fontWeight: 700, color: parseFloat(row[0]) >= 0 ? "var(--green)" : "#ef4444" }}>{row[0]}</td>
                <td style={{ color: "var(--gold)" }}>{row[1]}</td>
                <td style={{ color: "var(--text-secondary)" }}>{row[2]}</td>
                <td style={{ color: "var(--text-muted)" }}>{row[3]}</td>
                <td style={{ color: "var(--green)" }}>{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
