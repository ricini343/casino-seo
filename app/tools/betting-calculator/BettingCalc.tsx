"use client";

import { useState } from "react";

type OddsFormat = "american" | "decimal" | "fractional";

function oddsToDecimal(val: string, fmt: OddsFormat): number | null {
  if (fmt === "decimal") {
    const n = parseFloat(val);
    return isNaN(n) || n < 1 ? null : n;
  }
  if (fmt === "american") {
    const n = parseFloat(val);
    if (isNaN(n)) return null;
    return n >= 0 ? n / 100 + 1 : 100 / Math.abs(n) + 1;
  }
  if (fmt === "fractional") {
    const parts = val.split("/");
    if (parts.length !== 2) return null;
    const n = parseFloat(parts[0]), d = parseFloat(parts[1]);
    if (isNaN(n) || isNaN(d) || d === 0) return null;
    return n / d + 1;
  }
  return null;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function BettingCalc() {
  const [stake, setStake] = useState("100");
  const [odds, setOdds] = useState("-110");
  const [format, setFormat] = useState<OddsFormat>("american");

  const decimal = oddsToDecimal(odds, format);
  const stakeNum = parseFloat(stake) || 0;
  const totalPayout = decimal ? stakeNum * decimal : null;
  const profit = totalPayout !== null ? totalPayout - stakeNum : null;
  const impliedProb = decimal ? (1 / decimal) * 100 : null;

  return (
    <div>
      {/* Format selector */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {(["american", "decimal", "fractional"] as OddsFormat[]).map((f) => (
          <button
            key={f}
            onClick={() => { setFormat(f); setOdds(f === "american" ? "-110" : f === "decimal" ? "1.909" : "10/11"); }}
            style={{
              padding: "0.4rem 0.875rem",
              borderRadius: "0.5rem",
              border: `1.5px solid ${format === f ? "var(--green)" : "var(--border-light)"}`,
              background: format === f ? "rgba(0,255,135,0.1)" : "transparent",
              color: format === f ? "var(--green)" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: "400px", marginBottom: "1.5rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Stake ($)
          </label>
          <input
            type="number"
            className="input-field"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            min="0.01"
            step="any"
            placeholder="100"
          />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Odds ({format === "american" ? "+/-" : format === "decimal" ? "e.g. 2.50" : "e.g. 3/2"})
          </label>
          <input
            type="text"
            className="input-field"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            placeholder={format === "american" ? "-110" : format === "decimal" ? "1.909" : "10/11"}
          />
        </div>
      </div>

      {totalPayout !== null && profit !== null && impliedProb !== null && stakeNum > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
            background: "linear-gradient(135deg,rgba(0,255,135,0.08) 0%,rgba(255,215,0,0.05) 100%)",
            border: "1px solid rgba(0,255,135,0.25)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
          }}
        >
          {[
            { label: "Stake", value: fmt(stakeNum), color: "var(--text-primary)" },
            { label: "Profit", value: fmt(profit), color: "var(--green)" },
            { label: "Total Return", value: fmt(totalPayout), color: "var(--gold)" },
            { label: "Implied Prob.", value: `${impliedProb.toFixed(1)}%`, color: "var(--text-primary)" },
          ].map((r) => (
            <div key={r.label} style={{ textAlign: "center" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                {r.label}
              </div>
              <div style={{ color: r.color, fontSize: "1.5rem", fontWeight: 900 }}>{r.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
