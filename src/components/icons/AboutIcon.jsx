import { useEffect, useRef, useState } from 'react'

export default function AboutIcon({ size = 56 }) {
    const ref = useRef(null)
    const [message, setMessage] = useState('Hi!')

    useEffect(() => {
        const svg = ref.current
        const target = svg?.closest('.desktop-icon') ?? svg
        if (!target) return
        const roll = () => setMessage(Math.random() < 0.15 ? ':3' : 'Hi!')
        target.addEventListener('mouseenter', roll)
        return () => target.removeEventListener('mouseenter', roll)
    }, [])

    return (
        <svg
            ref={ref}
            className="icon-about app-icon"
            width={size}
            height={size}
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="144" height="144" rx="14" fill="#c27780" stroke="#8c4a54" strokeWidth="5" />

            <g className="person">
                <path
                    d="M75 62 C60 62 52 82 50 108 C49 118 53 124 61 124 H89 C97 124 101 118 100 108 C98 82 90 62 75 62 Z"
                    fill="#e0a1a5"
                />
                <circle className="head" cx="75" cy="52" r="17" fill="#e0a1a5" />
            </g>

            <g className="bubble">
                <rect x="100" y="14" width="40" height="24" rx="12" fill="#fbe4e6" />
                <polygon points="106,36 117,36 103,47" fill="#fbe4e6" />
                <text
                    x="120"
                    y="30"
                    textAnchor="middle"
                    fontFamily="system-ui,-apple-system,Segoe UI,sans-serif"
                    fontSize="13"
                    fontWeight="700"
                    fill="#8c4a54"
                >
                    {message}
                </text>
            </g>
        </svg>
    )
}