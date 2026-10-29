export default function ResumeIcon({ size = 56 }) {
    return (
        <svg
            className="icon-resume app-icon"
            width={size}
            height={size}
            viewBox="0 0 450 450"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="9" y="9" width="432" height="432" rx="60" ry="60" fill="#8c8fd8" stroke="#5d60ae" strokeWidth="15" />

            {/* static wrapper: centers the document in the tile without touching the animated transforms */}
            <g transform="translate(0 20)">
                <g className="resume-page">
                    {/* page with folded corner */}
                    <path
                        d="M153 85 H270 L315 130 V307 A18 18 0 0 1 297 325 H153 A18 18 0 0 1 135 307 V103 A18 18 0 0 1 153 85 Z"
                        fill="#eceefb"
                    />
                    <path d="M270 85 V112 A18 18 0 0 0 288 130 H315 Z" fill="#c3c7ee" />

                    {/* avatar and heading */}
                    <circle cx="178" cy="168" r="22" fill="#b5baea" />
                    <rect x="212" y="152" width="70" height="12" rx="6" fill="#b5baea" />
                    <rect x="212" y="174" width="45" height="10" rx="5" fill="#b5baea" />

                    {/* text lines */}
                    <rect x="158" y="222" width="134" height="10" rx="5" fill="#b5baea" />
                    <rect x="158" y="246" width="134" height="10" rx="5" fill="#b5baea" />
                    <rect x="158" y="270" width="100" height="10" rx="5" fill="#b5baea" />

                    {/* checkmark badge: hidden at rest, pops in on hover */}
                    <g className="resume-badge">
                        <circle cx="315" cy="315" r="44" fill="#ffffff" stroke="#5d60ae" strokeWidth="10" />
                        <path
                            d="M296 316 L310 330 L336 300"
                            fill="none"
                            stroke="#5d60ae"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </g>
            </g>
        </svg>
    )
}