import { useEffect, useRef, useState } from 'react'
import AppIcon from './AppIcon'
import { useIsMobile } from '../hooks/useIsMobile'

export default function StartMenu({ apps, onOpen }) {
    const isMobile = useIsMobile()
    const [open, setOpen] = useState(false)
    const root = useRef(null)
    const button = useRef(null)

    useEffect(() => {
        if (isMobile) setOpen(false)
    }, [isMobile])

    useEffect(() => {
        if (!open) return

        const onPointerDown = (e) => {
            if (!root.current?.contains(e.target)) setOpen(false)
        }
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpen(false)
                button.current?.focus()
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        root.current?.querySelector('.start__item')?.focus()

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    if (isMobile) return null

    const choose = (app) => {
        setOpen(false)
        onOpen(app.id)
    }

    return (
        <div className="start" ref={root}>
            <button
                ref={button}
                type="button"
                className="start__button"
                aria-label="Apps menu"
                aria-expanded={open}
                aria-controls="start-menu"
                onClick={() => setOpen((o) => !o)}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            </button>

            {open && (
                <div className="start__menu" id="start-menu" aria-label="All apps">
                    <p className="start__heading">Apps</p>
                    <ul className="start__list">
                        {apps.map((app) => (
                            <li key={app.id}>
                                <button type="button" className="start__item" onClick={() => choose(app)}>
                                    <AppIcon app={app} size={28} />
                                    <span>{app.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}