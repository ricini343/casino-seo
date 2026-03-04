"use client";

import { useState } from "react";
import { CheckCircle, XCircle, InfoCircle, AlertTriangle } from "@/components/SiteIcon";

function americanToDecimal(n: number): number {
  if (n >= 0) return n / 100 + 1;
  return 100 / Math.abs(n) + 1;
}

export default function EVCalc() {
  const [odds, setOdds] = useState("+150");
  const [winProb, setWinProb] = useState("40");
  const [stake, setStake] = useState("100");

  const oddsNum = parseFloat(odds);
  const probNum = parseFloat(winProb) / 100;
  const stakeNum = parseFloat(stake) || 100;

  const decimal = !isNaN(oddsNum) ? americanToDecimal(oddsNum) : null;
  const profit = decimal ? (decimal - 1) * stakeNum : null;

  let ev: number | null = null;
  let evPct: number | null = null;
  if (decimal && !isNaN(probNum) && probNum > 0 && probNum < 1) {
    // EV = (win_prob × profit) - (lose_prob × stake)
    ev = probNum * (profit!) - (1 - probNum) * stakeNum;
    evPct = ev / stakeNum * 100;
  }

  const isPositive = ev !== null && ev > 0;
  const impliedProb = decimal ? (1 / decimal) * 100 : null;
  const edge = impliedProb && !isNaN(probNum) ? parseFloat(winProb) - impliedProb : null;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Sportsbook Odds (American)
          </label>
          <input type="text" className="input-field" value={odds} onChange={(e) => setOdds(e.target.value)} placeholder="+150" />
          {impliedProb !== null && <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "4px" }}>Implied probability: {impliedProb.toFixed(1)}%</p>}
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Your Estimated Win Probability (%)
          </label>
          <input type="number" className="input-field" value={winProb} onChange={(e) => setWinProb(e.target.value)} min="1" max="99" step="0.1" placeholder="40" />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Stake ($)
          </label>
          <input type="number" className="input-field" value={stake} onChange={(e) => setStake(e.target.value)} min="1" step="any" placeholder="100" />
        </div>
      </div>

      {ev !== null && (
        <div
          style={{
            background: isPositive
              ? "linear-gradient(135deg,rgba(0,255,135,0.1),rgba(0,255,135,0.05))"
              : "linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.05))",
            border: `1px solid ${isPositive ? "rgba(0,255,135,0.3)" : "rgba(239,68,68,0.3)"}`,
            borderRadius: "0.75rem",
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <div
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                background: isPositive ? "rgba(0,255,135,0.15)" : "rgba(239,68,68,0.15)",
                border: `1px solid ${isPositive ? "rgba(0,255,135,0.4)" : "rgba(239,68,68,0.4)"}`,
                fontWeight: 900,
                fontSize: "1.25rem",
                color: isPositive ? "var(--green)" : "#ef4444",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isPositive ? <CheckCircle size={20} /> : <XCircle size={20} />}
                {isPositive ? "+EV BET" : "-EV BET"}
              </span>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: isPositive ? "var(--green)" : "#ef4444", fontSize: "1.5rem" }}>
                {isPositive ? "+" : ""}{ev.toFixed(2)} ({isPositive ? "+" : ""}{evPct!.toFixed(2)}%)
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Expected value per ${stakeNum} bet</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Your Est. Win %", value: `${winProb}%`, color: "var(--text-primary)" },
              { label: "Book Implied %", value: `${impliedProb!.toFixed(1)}%`, color: "var(--text-muted)" },
              { label: "Edge", value: `${edge! > 0 ? "+" : ""}${edge!.toFixed(1)}%`, color: edge! > 0 ? "var(--green)" : "#ef4444" },
              { label: "Profit if Win", value: `$${(profit!).toFixed(2)}`, color: "var(--gold)" },
            ].map((r) => (
              <div key={r.label} style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{r.label}</div>
                <div style={{ color: r.color, fontSize: "1.25rem", fontWeight: 800 }}>{r.value}</div>
              </div>
            ))}
          </div>

          {isPositive && (
            <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "rgba(0,255,135,0.05)", borderRadius: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              <InfoCircle size={14} style={{ display: "inline", verticalAlign: "middle" }} /> This bet has a positive expected value of <strong style={{ color: "var(--green)" }}>${Math.abs(ev).toFixed(2)}</strong> per bet. Over 100 similar bets, you'd expect to profit <strong style={{ color: "var(--green)" }}>${(Math.abs(ev) * 100).toFixed(0)}</strong>.
            </div>
          )}
          {!isPositive && (
            <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "rgba(239,68,68,0.05)", borderRadius: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              <AlertTriangle size={14} style={{ display: "inline", verticalAlign: "middle" }} /> This bet has negative expected value of <strong style={{ color: "#ef4444" }}>${Math.abs(ev).toFixed(2)}</strong> per bet. Either find better odds or re-assess your win probability estimate.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
