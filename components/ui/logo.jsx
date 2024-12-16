export function WanderSmartLogo({ className = "", width = "100%", height = "auto" }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Mountain Icon */}
            <path
                d="M40 15L25 45H55L40 15ZM40 25L47 40H33L40 25Z"
                fill="#E11D48"
            />

            {/* WanderSmart Text */}
            <text
                x="65"
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
                x="65"
                y="45"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#E11D48"
            >
                Explore with Ease
            </text>
        </svg>
    )
}

