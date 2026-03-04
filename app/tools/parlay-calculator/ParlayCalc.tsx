"use client";

import { useState, useCallback } from "react";

interface Leg {
  id: number;
  odds: string;
  label: string;
}

function americanToDecimal(american: number): number {
  if (american > 0) return american / 100 + 1;
  return 100 / Math.abs(american) + 1;
}

function decimalToImpliedProb(decimal: number): number {
  return (1 / decimal) * 100;
}

function formatAmerican(decimal: number): string {
  const american = decimal >= 2 ? (decimal - 1) * 100 : -100 / (decimal - 1);
  if (american >= 0) return `+${Math.round(american)}`;
  return `${Math.round(american)}`;
}

function formatPayout(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function ParlayCalc() {
  const [legs, setLegs] = useState<Leg[]>([
    { id: 1, odds: "+110", label: "" },
    { id: 2, odds: "-110", label: "" },
  ]);
  const [stake, setStake] = useState("100");
  const [nextId, setNextId] = useState(3);

  const addLeg = useCallback(() => {
    if (legs.length >= 12) return;
    setLegs((prev) => [...prev, { id: nextId, odds: "-110", label: "" }]);
    setNextId((n) => n + 1);
  }, [legs.length, nextId]);

  const removeLeg = useCallback((id: number) => {
    if (legs.length <= 2) return;
    setLegs((prev) => prev.filter((l) => l.id !== id));
  }, [legs.length]);

  const updateLeg = useCallback((id: number, field: keyof Leg, value: string) => {
    setLegs((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }, []);

  // Compute results
  const parsedLegs = legs.map((leg) => {
    const num = parseFloat(leg.odds.replace(/\s/g, ""));
    if (isNaN(num)) return { valid: false, decimal: 1, prob: 0, leg };
    const decimal = americanToDecimal(num);
    const prob = decimalToImpliedProb(decimal);
    return { valid: true, decimal, prob, leg };
  });

  const allValid = parsedLegs.every((l) => l.valid);
  const stakeNum = parseFloat(stake) || 0;
  const parlayDecimal = parsedLegs.reduce((acc, l) => acc * l.decimal, 1);
  const combinedProb = parsedLegs.reduce((acc, l) => (acc * l.prob) / 100, 1) * 100;
  const totalPayout = stakeNum * parlayDecimal;
  const profit = totalPayout - stakeNum;
  const parlayAmerican = formatAmerican(parlayDecimal);

  return (
    <div>
      {/* Stake */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Stake Amount ($)
        </label>
        <input
          type="number"
          className="input-field"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          min="0.01"
          step="any"
          placeholder="100"
          style={{ maxWidth: "200px" }}
        />
      </div>

      {/* Legs */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Parlay Legs ({legs.length})
          </span>
          <button
            onClick={addLeg}
            disabled={legs.length >= 12}
            style={{
              padding: "0.375rem 0.875rem",
              background: "rgba(0,255,135,0.12)",
              border: "1px solid rgba(0,255,135,0.3)",
              borderRadius: "0.5rem",
              color: "var(--green)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: legs.length >= 12 ? "not-allowed" : "pointer",
              opacity: legs.length >= 12 ? 0.5 : 1,
            }}
          >
            + Add Leg
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {legs.map((leg, i) => {
            const parsed = parsedLegs[i];
            return (
              <div
                key={leg.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr 140px auto",
                  gap: "0.625rem",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--border-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Team / Game (optional)"
                  value={leg.label}
                  onChange={(e) => updateLeg(leg.id, "label", e.target.value)}
                  style={{ fontSize: "0.875rem" }}
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="+110"
                    value={leg.odds}
                    onChange={(e) => updateLeg(leg.id, "odds", e.target.value)}
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      borderColor: !parsed.valid && leg.odds ? "var(--red)" : undefined,
                      color: leg.odds.startsWith("+") ? "var(--green)" : leg.odds.startsWith("-") ? "#ef4444" : "var(--text-primary)",
                    }}
                  />
                  {parsed.valid && (
                    <span
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        pointerEvents: "none",
                      }}
                    >
                      {parsed.prob.toFixed(1)}%
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeLeg(leg.id)}
                  disabled={legs.length <= 2}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "transparent",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-muted)",
                    cursor: legs.length <= 2 ? "not-allowed" : "pointer",
                    opacity: legs.length <= 2 ? 0.3 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    flexShrink: 0,
                  }}
                  aria-label="Remove leg"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {allValid && stakeNum > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(255,215,0,0.06) 100%)",
            border: "1px solid rgba(0,255,135,0.3)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.25rem" }}>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Parlay Odds
              </div>
              <div style={{ color: "var(--green)", fontSize: "1.75rem", fontWeight: 900 }}>
                {parlayAmerican}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                ({parlayDecimal.toFixed(2)}x decimal)
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Total Payout
              </div>
              <div style={{ color: "var(--gold)", fontSize: "1.75rem", fontWeight: 900 }}>
                {formatPayout(totalPayout)}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                on {formatPayout(stakeNum)} stake
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Profit
              </div>
              <div style={{ color: "var(--green)", fontSize: "1.75rem", fontWeight: 900 }}>
                {formatPayout(profit)}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                net winnings
              </div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Win Probability
              </div>
              <div style={{ color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 900 }}>
                {combinedProb.toFixed(2)}%
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                combined ({legs.length} legs)
              </div>
            </div>
          </div>

          {/* Individual legs */}
          <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(0,255,135,0.15)", paddingTop: "1rem" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Leg Breakdown
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {parsedLegs.map((pl, i) => (
                <span
                  key={pl.leg.id}
                  style={{
                    padding: "0.25rem 0.625rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Leg {i + 1}: <strong style={{ color: "var(--gold)" }}>{pl.leg.odds}</strong> ({pl.prob.toFixed(1)}%)
                  {pl.leg.label && ` — ${pl.leg.label}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
