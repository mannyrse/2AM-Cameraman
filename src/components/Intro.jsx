import { useCallback, useEffect, useRef, useState } from 'react'
import { getMotion } from '../hooks/useMotion'

const KEY = 'introSeen'
const FADE_MS = 700
const START_TIMEOUT_MS = 4000 // give up if the video hasn't started playing

export function shouldSkipIntro() {
    if (getMotion() === 'reduced') return true
    try {
        return sessionStorage.getItem(KEY) === '1'
    } catch {
        return false
    }
}

export default function Intro({ onReveal }) {
    const [started, setStarted] = useState(false)
    const [leaving, setLeaving] = useState(false)
    const [gone, setGone] = useState(false)
    const finished = useRef(false)
    const videoRef = useRef(null)
    const skipRef = useRef(null)

    const finish = useCallback(() => {
        if (finished.current) return
        finished.current = true
        try {
            sessionStorage.setItem(KEY, '1')
        } catch {
            /* storage unavailable: intro will just replay next visit */
        }
        setLeaving(true)
        onReveal()
    }, [onReveal])

    // Focus the Skip button, and try to start the video (autoplay can be blocked)
    useEffect(() => {
        skipRef.current?.focus()
        videoRef.current?.play()?.catch(finish)
    }, [finish])

    // If the video never starts, don't trap the visitor
    useEffect(() => {
        if (started) return
        const id = setTimeout(finish, START_TIMEOUT_MS)
        return () => clearTimeout(id)
    }, [started, finish])

    // Escape also skips
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && finish()
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [finish])

    // Remove the overlay once the fade-out is done
    useEffect(() => {
        if (!leaving) return
        const id = setTimeout(() => setGone(true), FADE_MS)
        return () => clearTimeout(id)
    }, [leaving])

    if (gone) return null

    return (
        <div className={`intro${leaving ? ' intro--leaving' : ''}`} role="dialog" aria-label="Introduction">
            <video
                ref={videoRef}
                className="intro__video"
                src="/videos/moon.mp4"
                autoPlay
                muted
                playsInline
                onPlaying={() => setStarted(true)}
                onEnded={finish}
                onError={finish}
            />
            <button ref={skipRef} className="intro__skip" onClick={finish}>
                Skip intro
            </button>
        </div>
    )
}