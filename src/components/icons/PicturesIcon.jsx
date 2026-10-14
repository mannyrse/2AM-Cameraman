import { useId } from 'react'

// 8 rays around the sun at (118, 38): inner radius 20, outer radius 25
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const CX = 118
const CY = 38

export default function PicturesIcon({ size = 56 }) {
    const clipId = `inner-${useId().replace(/:/g, '')}`

    return (
        <svg
            className="icon-pictures app-icon"
            width={size}
            height={size}
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <clipPath id={clipId}>
                    <rect x="6" y="6" width="138" height="138" rx="12" />
                </clipPath>
            </defs>

            <rect x="3" y="3" width="144" height="144" rx="14" fill="#86b872" stroke="#5f9150" strokeWidth="5" />

            <g clipPath={`url(#${clipId})`}>
                <g className="rays" stroke="#d3e9c4" strokeWidth="3.5" strokeLinecap="round">
                    {RAY_ANGLES.map((deg) => {
                        const rad = (deg * Math.PI) / 180
                        const cos = Math.cos(rad)
                        const sin = Math.sin(rad)
                        return (
                            <line
                                key={deg}
                                x1={CX + 20 * cos}
                                y1={CY + 20 * sin}
                                x2={CX + 25 * cos}
                                y2={CY + 25 * sin}
                            />
                        )
                    })}
                </g>
                <circle className="sun" cx={CX} cy={CY} r="15" fill="#bcdcab" />
                <path d="M0 150 L0 128 L40 100 L58 118 L100 84 L150 128 L150 150 Z" fill="#b2d79f" />
            </g>
        </svg>
    )
}