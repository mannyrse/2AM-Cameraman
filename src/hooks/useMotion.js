import { useEffect, useState } from 'react'

const KEY = 'motion'

function initial() {
    try {
        const saved = localStorage.getItem(KEY)
        if (saved === 'reduced' || saved === 'full') return saved
    } catch {
        /* storage unavailable: fall through to the OS setting */
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full'
}

export function useMotion() {
    const [motion, setMotionState] = useState(initial)

    useEffect(() => {
        document.documentElement.dataset.motion = motion
    }, [motion])

    const setMotion = (value) => {
        setMotionState(value)
        try {
            localStorage.setItem(KEY, value) // only saved when the visitor chooses
        } catch {
            /* ignore */
        }
    }

    return [motion, setMotion]
}