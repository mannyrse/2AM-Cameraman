// MXPaint icon: yellow tile, a brush that swings down and leaves a stroke.
// Animation CSS lives in desktop.css (.icon-paint).
export default function PaintIcon({ size = 56 }) {
    return (
        <svg
            className="icon-paint app-icon"
            width={size}
            height={size}
            viewBox="0 0 450 450"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <rect x="9" y="9" width="432" height="432" rx="60" ry="60" fill="#f0dd7f" stroke="#d0b955" strokeWidth="15" />

            <path
                className="paint-trail"
                d="M95 314 A308.2 308.2 0 0 0 210.8 406.8"
                pathLength="100"
                fill="none"
                stroke="#fff6c4"
                strokeWidth="27"
                strokeLinecap="round"
            />

            <g className="paint-brush" fill="#d0b955">
                <path d="M198.6 241.6 L329.4 116.4 A15 15 0 0 1 350.6 137.6 L225.4 268.4 Z" />
                <path d="M192 250 L221 279 C226 300 214 322 196 332 C170 346 128 344 93 310 C118 312 133 300 137 285 C141 268 165 250 192 250 Z" />
            </g>
        </svg>
    )
}