export function WanderSmartLogo({
  className = "",
  width = "100%",
  height = "auto",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 190 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Map Pin (Scaled Down) */}
      <path
        d="M32 6C24 6 18 12 18 20c0 8 14 26 14 26s14-18 14-26c0-8-6-14-14-14z"
        fill="#E11D48"
      />
      {/* Inner Circle */}
      <circle cx="32" cy="20" r="5" fill="white" />
      {/* Dotted Path */}
      <path
        d="M22 46 Q32 38 42 46"
        stroke="#E11D48"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4,4"
      />
      {/* WanderSmart Text */}
      <text
        x="52"
        y="30"
        fontFamily="Arial-Bold, Arial"
        fontSize="20"
        fontWeight="bold"
        fill="#E11D48"
      >
        WanderSmart
      </text>

      {/* Explore with Ease Text */}
      <text
        x="52"
        y="45"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fill="#E11D48"
      >
        Explore with Ease
      </text>
    </svg>
  );
}
