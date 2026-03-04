interface StarRatingProps {
  rating: number; // 1-5
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({ rating, size = "md", showNumber = false }: StarRatingProps) {
  const sizes = { sm: 14, md: 18, lg: 22 };
  const px = sizes[size];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={px}
          height={px}
          viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? "var(--gold)" : "var(--border-light)"}
          style={{ flexShrink: 0 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {showNumber && (
        <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: size === "sm" ? "0.75rem" : "0.875rem", marginLeft: "4px" }}>
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
