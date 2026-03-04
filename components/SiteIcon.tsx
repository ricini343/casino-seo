/**
 * Premium SVG icon set — replaces all emoji across the site.
 * Stroke-based, consistent 1.75 strokeWidth, matches Lucide style.
 */

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const base = (size: number, children: React.ReactNode) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

// ── Status ────────────────────────────────────────────────
export function CheckCircle({ size = 16 }: IconProps) {
  return base(size, <><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></>);
}
export function XCircle({ size = 16 }: IconProps) {
  return base(size, <><circle cx="12" cy="12" r="9" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></>);
}
export function AlertTriangle({ size = 16 }: IconProps) {
  return base(size, <><path d="M10.3 3.4L2 19h20L13.7 3.4a2 2 0 00-3.4 0z" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="12" y1="17" x2="12.01" y2="17" /></>);
}
export function Clock({ size = 16 }: IconProps) {
  return base(size, <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>);
}
export function InfoCircle({ size = 16 }: IconProps) {
  return base(size, <><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="8" x2="12.01" y2="8" /></>);
}

// ── Brands / Types ────────────────────────────────────────
export function CasinoIcon({ size = 24 }: IconProps) {
  // Playing cards fan
  return base(size, <>
    <rect x="3" y="8" width="10" height="14" rx="1.5" />
    <rect x="8" y="4" width="10" height="14" rx="1.5" opacity="0.5" />
    <line x1="7" y1="13" x2="11" y2="13" />
    <line x1="9" y1="11" x2="9" y2="15" />
  </>);
}
export function SportsbookIcon({ size = 24 }: IconProps) {
  // Clean lightning bolt
  return base(size, <polygon points="13 2 4.5 13.5 11 13.5 11 22 19.5 10.5 13 10.5 13 2" />);
}

// ── Features (stat grids) ─────────────────────────────────
export function SlotsIcon({ size = 20 }: IconProps) {
  // Three stacked slots / grid
  return base(size, <>
    <rect x="3" y="6" width="5" height="12" rx="1" />
    <rect x="9.5" y="6" width="5" height="12" rx="1" />
    <rect x="16" y="6" width="5" height="12" rx="1" />
    <line x1="3" y1="12" x2="8" y2="12" />
    <line x1="9.5" y1="12" x2="14.5" y2="12" />
    <line x1="16" y1="12" x2="21" y2="12" />
  </>);
}
export function CardsIcon({ size = 20 }: IconProps) {
  // Two overlapping cards
  return base(size, <>
    <rect x="4" y="7" width="12" height="15" rx="1.5" />
    <rect x="8" y="3" width="12" height="15" rx="1.5" opacity="0.5" />
    <line x1="8" y1="12" x2="13" y2="12" />
    <line x1="10.5" y1="9.5" x2="10.5" y2="14.5" />
  </>);
}
export function LiveIcon({ size = 20 }: IconProps) {
  // Camera / stream
  return base(size, <>
    <path d="M15 10l5-3v10l-5-3V10z" />
    <rect x="2" y="7" width="13" height="10" rx="1.5" />
    <circle cx="8.5" cy="12" r="2" />
  </>);
}
export function PhoneIcon({ size = 20 }: IconProps) {
  return base(size, <>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </>);
}
export function DollarIcon({ size = 20 }: IconProps) {
  return base(size, <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9.5 9.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2-5 2-5 4 0 1.1.9 2 2.5 2s2.5-.9 2.5-2" />
  </>);
}
export function SpeedIcon({ size = 20 }: IconProps) {
  // Fast / withdrawal speed (gauge)
  return base(size, <>
    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path d="M12 12l4-4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <path d="M5.5 14.5s1-5 6.5-2.5" opacity="0.4" />
  </>);
}
export function TrophyIcon({ size = 20 }: IconProps) {
  return base(size, <>
    <path d="M8 21h8M12 17v4M7 4H5a2 2 0 00-2 2v1c0 2.5 2 4.5 4 5" />
    <path d="M17 4h2a2 2 0 012 2v1c0 2.5-2 4.5-4 5" />
    <path d="M7 4c0 6 10 6 10 0V2H7v2z" />
    <line x1="12" y1="12" x2="12" y2="17" />
  </>);
}
export function PokerIcon({ size = 20 }: IconProps) {
  return base(size, <>
    <path d="M12 2L9 7H4l4 3-2 5 6-4 6 4-2-5 4-3h-5l-3-5z" />
  </>);
}

// ── Trust / Site Features ─────────────────────────────────
export function ShieldCheck({ size = 24 }: IconProps) {
  return base(size, <>
    <path d="M12 2L4 6v6c0 5 4 9.5 8 11 4-1.5 8-6 8-11V6L12 2z" />
    <polyline points="9 12 11 14 15 10" />
  </>);
}
export function SearchIcon({ size = 24 }: IconProps) {
  return base(size, <>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </>);
}
export function RefreshIcon({ size = 24 }: IconProps) {
  return base(size, <>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.5 15a9 9 0 1 0 .5-5.5" />
  </>);
}
export function ScaleIcon({ size = 24 }: IconProps) {
  return base(size, <>
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M6 7L2 14c0 2 2 3 4 3s4-1 4-3L6 7z" />
    <path d="M18 7l-4 7c0 2 2 3 4 3s4-1 4-3l-4-7z" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </>);
}
export function StarIcon({ size = 24 }: IconProps) {
  return base(size, <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />);
}
export function UsFlag({ size = 18 }: IconProps) {
  // Simple location pin with "US" — cleaner than flag emoji
  return base(size, <>
    <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </>);
}
