import { useRef } from 'react'

export default function WindowFrame({ app, win, isActive, onFocus, onClose, onMove, children }) {
    const ref = useRef(null)
    const drag = useRef(null)

    const handleDown = (e) => {
        if (e.button !== 0 || e.target.closest('button')) return // left click only, never from buttons
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
        const taskbar = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height'),
            10
        )

        const maxX = Math.max(0, parent.clientWidth - el.offsetWidth)
        const maxY = Math.max(0, parent.clientHeight - taskbar - el.offsetHeight)

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

    return (
        <section
            ref={ref}
            className={`window${isActive ? ' window--active' : ''}`}
            style={{
                left: win.position.x,
                top: win.position.y,
                width: app.width,
                height: app.height,
                zIndex: win.zIndex,
            }}
            onPointerDown={() => onFocus(app.id)}
            aria-label={app.name}
        >
            <header
                className="window__titlebar"
                onPointerDown={handleDown}
                onPointerMove={handleMove}
                onPointerUp={handleUp}
                onPointerCancel={handleUp}
            >
                <span className="window__title">
                    <span aria-hidden="true">{app.icon}</span> {app.name}
                </span>
                <button
                    className="window__close"
                    aria-label={`Close ${app.name}`}
                    onClick={() => onClose(app.id)}
                >
                    ✕
                </button>
            </header>
            <div className="window__content">{children}</div>
        </section>
    )
}