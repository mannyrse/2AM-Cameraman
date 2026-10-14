import { useId } from 'react'

const CHEVRON_OFFSETS = [0, 34, 68, 102, 136, 170]

export default function VideosIcon({ size = 56 }) {
    const clipId = `band-${useId().replace(/:/g, '')}`

    return (
        <svg
            className="icon-videos app-icon"
            width={size}
            height={size}
            viewBox="0 0 160 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <clipPath id={clipId}>
                    <rect x="12" y="12" width="136" height="46" />
                </clipPath>
            </defs>

            <rect x="3" y="3" width="154" height="154" rx="14" fill="#7eaac6" stroke="#4f7f9e" strokeWidth="5" />
            <rect x="8" y="8" width="144" height="54" rx="8" fill="#6f9cb9" />
            <rect x="8" y="62" width="144" height="4" fill="#4f7f9e" />

            <g clipPath={`url(#${clipId})`}>
                <g className="arrows">
                    <g fill="#e6ecf0">
                        {CHEVRON_OFFSETS.map((x) => (
                            <polygon
                                key={x}
                                points="0,0 15,0 27,18 15,36 0,36 12,18"
                                transform={`translate(${x - 22} 17)`}
                            />
                        ))}
                    </g>
                </g>
            </g>

            <polygon points="66,86 66,134 108,110" fill="#e6ecf0" />
        </svg>
    )
}