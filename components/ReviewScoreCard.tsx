import type { ReviewScores } from "@/lib/data";

interface Props {
  scores: ReviewScores;
  type: "sportsbook" | "casino";
}

const SCORE_LABELS: Record<keyof ReviewScores, { sb: string; casino: string }> = {
  bonus:     { sb: "Welcome Bonus",   casino: "Welcome Bonus" },
  app:       { sb: "Mobile App",      casino: "Mobile App" },
  selection: { sb: "Odds & Markets",  casino: "Game Selection" },
  payouts:   { sb: "Payouts",         casino: "Payouts" },
  support:   { sb: "Customer Support", casino: "Customer Support" },
  ux:        { sb: "User Experience", casino: "User Experience" },
  overall:   { sb: "Overall",         casino: "Overall" },
};

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color =
    score >= 9 ? "var(--green)" : score >= 8 ? "#7fff6a" : score >= 7 ? "var(--gold)" : "#ff7b5c";
  return (
    <div
      style={{
        height: "6px",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: "9999px",
          background: color,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

export default function ReviewScoreCard({ scores, type }: Props) {
  const subScores = (["bonus", "app", "selection", "payouts", "support", "ux"] as const).map(
    (key) => ({
      key,
      label: SCORE_LABELS[key][type === "casino" ? "casino" : "sb"],
      score: scores[key],
    })
  );

  return (
    <div
      className="card"
      style={{ padding: "1.5rem" }}
    >
      {/* Overall score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
            BetStateUSA Score
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Editorial rating based on independent testing
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              lineHeight: 1,
              background:
                scores.overall >= 9
                  ? "linear-gradient(135deg, #00FF87 0%, #7fffd4 100%)"
                  : scores.overall >= 8
                  ? "linear-gradient(135deg, #7fff6a 0%, #FFD700 100%)"
                  : "linear-gradient(135deg, #FFD700 0%, #ff9a3c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {scores.overall.toFixed(1)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            / 10
          </div>
        </div>
      </div>

      {/* Sub-scores */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {subScores.map(({ key, label, score }) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "130px",
                flexShrink: 0,
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
              }}
            >
              {label}
            </div>
            <ScoreBar score={score} />
            <div
              style={{
                width: "30px",
                flexShrink: 0,
                fontSize: "0.8125rem",
                fontWeight: 700,
                textAlign: "right",
                color: score >= 9 ? "var(--green)" : score >= 8 ? "#7fff6a" : "var(--gold)",
              }}
            >
              {score.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
