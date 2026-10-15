import { useSyncExternalStore } from 'react'

const KEY = 'motion'
const listeners = new Set()

function read() {
    try {
        const saved = localStorage.getItem(KEY)
        if (saved === 'reduced' || saved === 'full') return saved
    } catch {
        /* storage unavailable: fall through to the OS setting */
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full'
}

let current = read()
document.documentElement.dataset.motion = current

export const getMotion = () => current

export function setMotion(value) {
    current = value
    document.documentElement.dataset.motion = value
    try {
        localStorage.setItem(KEY, value) // only saved when the visitor chooses
    } catch {
        /* ignore */
    }
    listeners.forEach((l) => l())
}

const subscribe = (cb) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
}

export function useMotion() {
    const motion = useSyncExternalStore(subscribe, getMotion)
    return [motion, setMotion]
}