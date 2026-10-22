import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const G = 2 // size of one "pixel" in canvas units. increase for chunkier pixels.
const MAX_HISTORY = 30

const COLORS = [
    '#000000', '#ffffff', '#7f7f7f', '#c0392b',
    '#e67e22', '#f1c40f', '#27ae60', '#16a085',
    '#2980b9', '#8e44ad', '#e84393', '#8d5a2b',
]
const SIZES = [1, 2, 4, 8] // in pixels (cells)

export default function PaintApp() {
    const stageRef = useRef(null)
    const canvasRef = useRef(null)
    const drawing = useRef(false)
    const lastCell = useRef({ x: 0, y: 0 })
    const history = useRef({ stack: [], i: -1 })

    const [dims, setDims] = useState(null) // canvas size, measured once from the free space
    const [tool, setTool] = useState('brush')
    const [color, setColor] = useState(COLORS[0])
    const [size, setSize] = useState(SIZES[1])
    const [confirming, setConfirming] = useState(false)
    const [flags, setFlags] = useState({ canUndo: false, canRedo: false })

    const [W, H] = dims ?? [0, 0]

    // Size the canvas to fill the stage the first time it appears
    useLayoutEffect(() => {
        const el = stageRef.current
        let w = el.clientWidth
        let h = el.clientHeight
        if (w < 80 || h < 80) { w = 640; h = 400 }
        w = Math.min(w, 1400)
        h = Math.min(h, 1000)
        setDims([Math.floor(w / G) * G, Math.floor(h / G) * G])
    }, [])

    const ctx = () => canvasRef.current.getContext('2d')
    const ink = tool === 'eraser' ? '#ffffff' : color

    const updateFlags = () => {
        const { stack, i } = history.current
        setFlags({ canUndo: i > 0, canRedo: i < stack.length - 1 })
    }

    const commit = () => {
        const h = history.current
        h.stack = h.stack.slice(0, h.i + 1)
        h.stack.push(ctx().getImageData(0, 0, W, H))
        if (h.stack.length > MAX_HISTORY) h.stack.shift()
        h.i = h.stack.length - 1
        updateFlags()
    }

    const restore = (index) => {
        const h = history.current
        if (index < 0 || index >= h.stack.length) return
        h.i = index
        ctx().putImageData(h.stack[index], 0, 0)
        updateFlags()
    }

    const undo = () => restore(history.current.i - 1)
    const redo = () => restore(history.current.i + 1)

    // Keep the latest undo/redo available to the page-level key listener
    const actions = useRef({})
    actions.current = { undo, redo }

    useEffect(() => {
        const onKey = (e) => {
            if (!(e.metaKey || e.ctrlKey) || e.altKey) return

            // Only respond while this is the front window
            const win = stageRef.current?.closest('.window')
            if (!win?.classList.contains('window--active')) return

            const k = e.key.toLowerCase()
            if (k === 'z') {
                e.preventDefault()
                if (e.shiftKey) actions.current.redo()
                else actions.current.undo()
            } else if (k === 'y') {
                e.preventDefault()
                actions.current.redo()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const fillWhite = () => {
        const c = ctx()
        c.fillStyle = '#ffffff'
        c.fillRect(0, 0, W, H)
    }

    // Start with a white canvas once its size is known
    useEffect(() => {
        if (!dims) return
        fillWhite()
        history.current = { stack: [ctx().getImageData(0, 0, W, H)], i: 0 }
        updateFlags()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dims])

    /* ---------- drawing (square pixels on a grid) ---------- */
    const cellAt = (e) => {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) * W) / rect.width
        const y = ((e.clientY - rect.top) * H) / rect.height
        return { x: Math.floor(x / G), y: Math.floor(y / G) }
    }

    const stamp = (cx, cy) => {
        const start = -Math.floor(size / 2)
        ctx().fillRect((cx + start) * G, (cy + start) * G, size * G, size * G)
    }

    // Bresenham line between two cells, stamping the brush at each step
    const line = (x0, y0, x1, y1) => {
        const dx = Math.abs(x1 - x0)
        const dy = -Math.abs(y1 - y0)
        const sx = x0 < x1 ? 1 : -1
        const sy = y0 < y1 ? 1 : -1
        let err = dx + dy
        for (; ;) {
            stamp(x0, y0)
            if (x0 === x1 && y0 === y1) break
            const e2 = 2 * err
            if (e2 >= dy) { err += dy; x0 += sx }
            if (e2 <= dx) { err += dx; y0 += sy }
        }
    }

    const handleDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        e.currentTarget.setPointerCapture(e.pointerId)
        drawing.current = true
        ctx().fillStyle = ink
        const p = cellAt(e)
        lastCell.current = p
        stamp(p.x, p.y)
    }

    const handleMove = (e) => {
        if (!drawing.current) return
        const p = cellAt(e)
        const l = lastCell.current
        if (p.x === l.x && p.y === l.y) return
        line(l.x, l.y, p.x, p.y)
        lastCell.current = p
    }

    const handleUp = () => {
        if (!drawing.current) return
        drawing.current = false
        commit()
    }

    /* ---------- toolbar actions ---------- */
    const pickColor = (c) => {
        setColor(c)
        setTool('brush')
    }

    const clear = () => {
        fillWhite()
        commit() // clearing can be undone
        setConfirming(false)
    }

    const download = () => {
        const link = document.createElement('a')
        link.download = 'mxpaint-doodle.png'
        link.href = canvasRef.current.toDataURL('image/png')
        link.click()
    }

    return (
        <section className="paint">
            <div className="paint__bar">
                <div className="paint__group paint__group--tools" role="group" aria-label="Tool">
                    <button className="paint__btn" aria-pressed={tool === 'brush'} onClick={() => setTool('brush')}>
                        Brush
                    </button>
                    <button className="paint__btn" aria-pressed={tool === 'eraser'} onClick={() => setTool('eraser')}>
                        Eraser
                    </button>
                </div>

                <div className="paint__group paint__group--sizes" role="group" aria-label="Brush size">
                    {SIZES.map((s) => (
                        <button
                            key={s}
                            className="paint__btn paint__btn--size"
                            aria-label={`Brush size ${s}`}
                            aria-pressed={size === s}
                            onClick={() => setSize(s)}
                        >
                            <span className="paint__dot" style={{ width: s * G + 2, height: s * G + 2 }} />
                        </button>
                    ))}
                </div>

                <div className="paint__group paint__group--history" role="group" aria-label="History">
                    <button className="paint__btn" onClick={undo} disabled={!flags.canUndo}>Undo</button>
                    <button className="paint__btn" onClick={redo} disabled={!flags.canRedo}>Redo</button>
                </div>

                <div className="paint__group paint__group--actions">
                    <button className="paint__btn" onClick={() => setConfirming(true)}>Clear</button>
                    <button className="paint__btn paint__btn--primary" aria-label="Save as PNG" onClick={download}>
                        Save
                    </button>
                </div>

                <div className="paint__palette" role="group" aria-label="Colors">
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            className="paint__swatch"
                            style={{ background: c }}
                            aria-label={`Color ${c}`}
                            aria-pressed={tool === 'brush' && color === c}
                            onClick={() => pickColor(c)}
                        />
                    ))}
                </div>
            </div>

            {confirming && (
                <div className="paint__confirm" role="alert">
                    <span>Clear the whole canvas? You can still undo it.</span>
                    <button className="paint__btn paint__btn--danger" onClick={clear}>Yes, clear</button>
                    <button className="paint__btn" onClick={() => setConfirming(false)}>Cancel</button>
                </div>
            )}

            <div className="paint__stage" ref={stageRef}>
                {dims && (
                    <canvas
                        ref={canvasRef}
                        className="paint__canvas"
                        width={W}
                        height={H}
                        style={{ '--ratio': W / H }}
                        aria-label="Drawing canvas"
                        onPointerDown={handleDown}
                        onPointerMove={handleMove}
                        onPointerUp={handleUp}
                        onPointerCancel={handleUp}
                    />
                )}
            </div>
        </section>
    )
}