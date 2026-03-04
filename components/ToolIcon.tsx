interface ToolIconProps {
  tool: "parlay" | "odds" | "betting" | "ev";
  size?: number;
}

export default function ToolIcon({ tool, size = 28 }: ToolIconProps) {
  const icons = {
    parlay: (
      // Three nodes connected — represents parlay legs branching
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4.5" cy="12" r="2.5" />
        <circle cx="19.5" cy="5.5" r="2.5" />
        <circle cx="19.5" cy="18.5" r="2.5" />
        <line x1="7" y1="11.1" x2="17" y2="6.4" />
        <line x1="7" y1="12.9" x2="17" y2="17.6" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
      </svg>
    ),
    odds: (
      // Two horizontal swap arrows — conversion
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h13" />
        <path d="M14 4l4 4-4 4" />
        <path d="M20 16H7" />
        <path d="M10 12l-4 4 4 4" />
      </svg>
    ),
    betting: (
      // Coin with dollar sign and upward tick
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="13" r="7" />
        <path d="M10 9v8" />
        <path d="M7.5 10.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2-5 2-5 4 0 1.1.9 2 2.5 2s2.5-.9 2.5-2" />
        <path d="M17.5 3.5l3 3-3 3" />
        <line x1="14.5" y1="6.5" x2="20.5" y2="6.5" />
      </svg>
    ),
    ev: (
      // Trending chart with plus badge
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 18 8 10 13 14 20 5" />
        <polyline points="16 5 20 5 20 9" />
        <line x1="2" y1="21" x2="22" y2="21" opacity="0.3" />
      </svg>
    ),
  };

  return icons[tool];
}
