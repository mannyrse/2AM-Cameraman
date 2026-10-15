import { useId } from 'react'
import { useMotion } from '../../hooks/useMotion'

const ROWS = [52, 75, 98]

const wave = (y) => {
    let d = `M-10 ${y} Q5 ${y - 14} 20 ${y}`
    for (let x = 50; x <= 230; x += 30) d += ` T${x} ${y}`
    return d
}
const flat = (y) => `M6 ${y} H144`

export default function MotionIcon({ size = 56 }) {
    const clipId = `motion-${useId().replace(/:/g, '')}`
    const [motion] = useMotion()
    const reduced = motion === 'reduced'

    return (
        <svg
            className="icon-motion app-icon"
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

            <rect x="3" y="3" width="144" height="144" rx="14" fill="#d19a5b" stroke="#9a6a32" strokeWidth="5" />

            <g clipPath={`url(#${clipId})`}>
                <g className="waves" fill="none" stroke="#f6e6cf" strokeWidth="6" strokeLinecap="round">
                    {ROWS.map((y) => (
                        <path key={y} d={reduced ? flat(y) : wave(y)} />
                    ))}
                </g>
            </g>
        </svg>
    )
}