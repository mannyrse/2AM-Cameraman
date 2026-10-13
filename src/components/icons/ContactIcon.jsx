export default function ContactIcon({ size = 56 }) {
    return (
        <svg
            className="icon-contact app-icon"
            width={size}
            height={size}
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="144" height="144" rx="14" fill="#8d6aa0" stroke="#5f3f73" strokeWidth="5" />
            <rect x="35" y="52" width="80" height="54" rx="4" fill="#9f7bb2" />
            <polygon className="flap-back" points="35,52 115,52 75,80" fill="#8a64a0" />
            <g className="letter">
                <rect x="46" y="58" width="58" height="42" rx="2" fill="#f4ecf8" />
                <rect x="54" y="66" width="42" height="3" rx="1.5" fill="#c3aed0" />
                <rect x="54" y="74" width="42" height="3" rx="1.5" fill="#c3aed0" />
                <rect x="54" y="82" width="26" height="3" rx="1.5" fill="#c3aed0" />
            </g>
            <polygon points="35,52 75,80 115,52 115,102 111,106 39,106 35,102" fill="#b793c8" />
            <polygon className="flap-front" points="35,52 115,52 75,80" fill="#c7a6d6" />
        </svg>
    )
}