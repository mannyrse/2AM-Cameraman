import { useRef } from 'react'
import AppIcon from './AppIcon'
import { useIsMobile } from '../hooks/useIsMobile'

const MIN_WIDTH = 320
const MIN_HEIGHT = 220

const getTaskbarHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height'), 10)

export default function WindowFrame({
    app, win, isActive, onFocus, onClose, onMinimize, onMove, onResize, children,
}) {
    const ref = useRef(null)
    const drag = useRef(null)
    const resize = useRef(null)
    const isMobile = useIsMobile()

    const size = win.size ?? { width: app.width, height: app.height }

    /* ---------- dragging ---------- */
    const handleDown = (e) => {
        if (isMobile || e.button !== 0 || e.target.closest('button')) return
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

    /* ---------- resizing ---------- */
    const startResize = (dir) => (e) => {
        if (isMobile || e.button !== 0) return
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

    const style = isMobile
        ? { zIndex: win.zIndex }
        : {
            left: win.position.x,
            top: win.position.y,
            width: size.width,
            height: size.height,
            zIndex: win.zIndex,
        }

    return (
        <section
            ref={ref}
            className={`window${isActive ? ' window--active' : ''}${win.minimized ? ' window--minimized' : ''}${isMobile ? ' window--mobile' : ''
                }`}
            style={style}
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
                    <button
                        className="window__btn window__btn--close"
                        aria-label={`Close ${app.name}`}
                        onClick={() => onClose(app.id)}
                    >
                        ✕
                    </button>
                </div>
            </header>

            <div className="window__content">{children}</div>

            {!isMobile && (
                <>
                    <div {...resizeHandle('e')} />
                    <div {...resizeHandle('s')} />
                    <div {...resizeHandle('se')} />
                </>
            )}
        </section>
    )
}