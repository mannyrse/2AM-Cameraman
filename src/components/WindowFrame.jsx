import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import AppIcon from './AppIcon'
import ErrorBoundary from './ErrorBoundary'
import { useIsMobile } from '../hooks/useIsMobile'

const MIN_WIDTH = 320
const MIN_HEIGHT = 220

const getTaskbarHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height'), 10)

export default function WindowFrame({
    app, win, isActive, onFocus, onClose, onMinimize, onMaximize, onMove, onResize, children,
}) {
    const ref = useRef(null)
    const drag = useRef(null)
    const resize = useRef(null)
    const isMobile = useIsMobile()
    const maximized = !!win.maximized && !isMobile
    const [animating, setAnimating] = useState(false)
    const timer = useRef(null)
    const opener = useRef(null)
    const firstRun = useRef(true)

    useEffect(() => () => clearTimeout(timer.current), [])

    const toggleMaximize = () => {
        setAnimating(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setAnimating(false), 300)
        onMaximize(app.id)
    }

    /* ---------- keyboard focus ---------- */
    // Open: remember what had focus, then move focus into the window.
    // Close (unmount): give focus back to the opener, or the desktop icon.
    useEffect(() => {
        const el = ref.current
        opener.current = document.activeElement
        el?.focus({ preventScroll: true })

        return () => {
            const active = document.activeElement
            // Don't steal focus if the user already moved somewhere else
            if (active && active !== document.body && !el?.contains(active)) return

            const target = opener.current
            if (target && target !== document.body && target.isConnected) {
                target.focus({ preventScroll: true })
            } else {
                document
                    .querySelector(`[data-desktop-app="${app.id}"]`)
                    ?.focus({ preventScroll: true })
            }
        }
    }, [app.id])

    // Minimize: send focus to this app's taskbar button.
    // Restore: bring focus back into the window.
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false
            return
        }
        if (win.minimized) {
            document
                .querySelector(`[data-taskbar-app="${app.id}"]`)
                ?.focus({ preventScroll: true })
        } else {
            ref.current?.focus({ preventScroll: true })
        }
    }, [win.minimized, app.id])

    // On minimize, aim the shrink animation at this app's taskbar button
    useLayoutEffect(() => {
        if (!win.minimized) return
        const el = ref.current
        const btn = document.querySelector(`[data-taskbar-app="${app.id}"]`)
        if (!el || !btn) return
        const parent = el.offsetParent.getBoundingClientRect()
        const b = btn.getBoundingClientRect()
        const dx = b.left + b.width / 2 - (parent.left + el.offsetLeft + el.offsetWidth / 2)
        const dy = b.top + b.height / 2 - (parent.top + el.offsetTop + el.offsetHeight / 2)
        el.style.setProperty('--min-x', `${dx}px`)
        el.style.setProperty('--min-y', `${dy}px`)
    }, [win.minimized, app.id])

    const size = win.size ?? { width: app.width, height: app.height }

    /* ---------- dragging ---------- */
    const handleDown = (e) => {
        if (isMobile || maximized || e.button !== 0 || e.target.closest('button')) return
        const el = ref.current
        e.currentTarget.setPointerCapture(e.pointerId)
        drag.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: el.offsetLeft,
            originY: el.offsetTop,
            x: el.offsetLeft,
            y: el.offsetTop,
        }
    }

    const handleMove = (e) => {
        const d = drag.current
        if (!d) return
        const el = ref.current
        const parent = el.offsetParent

        const maxX = Math.max(0, parent.clientWidth - el.offsetWidth)
        const maxY = Math.max(0, parent.clientHeight - getTaskbarHeight() - el.offsetHeight)

        d.x = Math.min(Math.max(0, d.originX + e.clientX - d.startX), maxX)
        d.y = Math.min(Math.max(0, d.originY + e.clientY - d.startY), maxY)

        el.style.left = `${d.x}px`
        el.style.top = `${d.y}px`
    }

    const handleUp = () => {
        const d = drag.current
        if (!d) return
        drag.current = null
        onMove(app.id, { x: d.x, y: d.y })
    }

    const handleDoubleClick = (e) => {
        if (isMobile || e.target.closest('button')) return
        toggleMaximize()
    }

    /* ---------- resizing ---------- */
    const startResize = (dir) => (e) => {
        if (isMobile || maximized || e.button !== 0) return
        const el = ref.current
        e.currentTarget.setPointerCapture(e.pointerId)
        resize.current = {
            dir,
            startX: e.clientX,
            startY: e.clientY,
            startW: el.offsetWidth,
            startH: el.offsetHeight,
            width: el.offsetWidth,
            height: el.offsetHeight,
        }
    }

    const moveResize = (e) => {
        const r = resize.current
        if (!r) return
        const el = ref.current
        const parent = el.offsetParent

        if (r.dir.includes('e')) {
            const maxW = parent.clientWidth - el.offsetLeft
            r.width = Math.min(Math.max(MIN_WIDTH, r.startW + e.clientX - r.startX), maxW)
            el.style.width = `${r.width}px`
        }
        if (r.dir.includes('s')) {
            const maxH = parent.clientHeight - getTaskbarHeight() - el.offsetTop
            r.height = Math.min(Math.max(MIN_HEIGHT, r.startH + e.clientY - r.startY), maxH)
            el.style.height = `${r.height}px`
        }
    }

    const endResize = () => {
        const r = resize.current
        if (!r) return
        resize.current = null
        onResize(app.id, { width: r.width, height: r.height })
    }

    const resizeHandle = (dir) => ({
        className: `window__resize window__resize--${dir}`,
        onPointerDown: startResize(dir),
        onPointerMove: moveResize,
        onPointerUp: endResize,
        onPointerCancel: endResize,
        'aria-hidden': true,
    })

    let style
    if (isMobile) {
        style = { zIndex: win.zIndex }
    } else if (maximized) {
        style = {
            left: 0,
            top: 0,
            width: '100%',
            height: 'calc(100% - var(--taskbar-height))',
            zIndex: win.zIndex,
        }
    } else {
        style = {
            left: win.position.x,
            top: win.position.y,
            width: size.width,
            height: size.height,
            zIndex: win.zIndex,
        }
    }

    const className = [
        'window',
        isActive && 'window--active',
        win.minimized && 'window--minimized',
        isMobile && 'window--mobile',
        maximized && 'window--maximized',
        animating && 'window--animating',
        win.closing && 'window--closing',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <section
            ref={ref}
            className={className}
            style={style}
            tabIndex={-1}
            onPointerDown={() => onFocus(app.id)}
            aria-label={app.name}
        >
            <header
                className="window__titlebar"
                onPointerDown={handleDown}
                onPointerMove={handleMove}
                onPointerUp={handleUp}
                onPointerCancel={handleUp}
                onDoubleClick={handleDoubleClick}
            >
                <span className="window__title">
                    <AppIcon app={app} size={16} /> {app.name}
                </span>
                <div className="window__controls">
                    <button
                        className="window__btn"
                        aria-label={`Minimize ${app.name}`}
                        onClick={() => onMinimize(app.id)}
                    >
                        ‒
                    </button>
                    {!isMobile && (
                        <button
                            className="window__btn"
                            aria-label={`${maximized ? 'Restore' : 'Maximize'} ${app.name}`}
                            onClick={toggleMaximize}
                        >
                            {maximized ? '❐' : '□'}
                        </button>
                    )}
                    <button
                        className="window__btn window__btn--close"
                        aria-label={`Close ${app.name}`}
                        onClick={() => onClose(app.id)}
                    >
                        ✕
                    </button>
                </div>
            </header>

            <div className="window__content">
                <ErrorBoundary name={app.name}>{children}</ErrorBoundary>
            </div>

            {!isMobile && !maximized && (
                <>
                    <div {...resizeHandle('e')} />
                    <div {...resizeHandle('s')} />
                    <div {...resizeHandle('se')} />
                </>
            )}
        </section>
    )
}