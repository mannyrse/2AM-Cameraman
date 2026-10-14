import { useCallback, useState } from 'react'
import Desktop from './Desktop'
import Intro, { shouldSkipIntro } from '../components/Intro'
import { useMotion } from '../hooks/useMotion'

export default function App() {
    useMotion()

    const [skip] = useState(shouldSkipIntro)
    const [ready, setReady] = useState(skip)
    const reveal = useCallback(() => setReady(true), [])

    return (
        <>
            <Desktop ready={ready} />
            {!skip && <Intro onReveal={reveal} />}
        </>
    )
}