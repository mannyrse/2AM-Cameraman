export default function ProjectsIcon({ size = 56 }) {
    return (
        <svg
            className="icon-projects app-icon"
            width={size}
            height={size}
            viewBox="0 0 450 450"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="9" y="9" width="432" height="432" rx="60" ry="60" fill="#7cc5c0" stroke="#4f9a96" strokeWidth="15" />

            {/* folder back with tab */}
            <path
                d="M114 120 H186 C194 120 201 123 206 129 L222 150 H336 A24 24 0 0 1 360 174 V330 A24 24 0 0 1 336 354 H114 A24 24 0 0 1 90 330 V144 A24 24 0 0 1 114 120 Z"
                fill="#c4e8e4"
            />

            {/* document: hidden behind the front panel at rest, slides up on hover */}
            <g className="projects-paper">
                <rect x="125" y="210" width="200" height="110" rx="10" fill="#ffffff" />
                <rect x="150" y="225" width="150" height="10" rx="5" fill="#9dd3cf" />
                <rect x="150" y="245" width="110" height="10" rx="5" fill="#9dd3cf" />
            </g>

            {/* folder front panel */}
            <rect className="projects-front" x="90" y="205" width="270" height="149" rx="24" fill="#e6f6f4" />
        </svg>
    )
}