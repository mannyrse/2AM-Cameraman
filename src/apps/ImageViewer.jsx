import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function ImageViewer({ photos, index, onClose, onNavigate }) {
    const closeRef = useRef(null)
    const opener = useRef(document.activeElement)
    const count = photos.length
    const photo = photos[index]

    useEffect(() => {
        const el = opener.current
        closeRef.current?.focus()
        return () => el?.focus?.()
    }, [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count)
            if (e.key === 'ArrowRight') onNavigate((index + 1) % count)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [index, count, onClose, onNavigate])

    return createPortal(
        <div className="viewer" role="dialog" aria-modal="true" aria-label={photo.title} onClick={onClose}>
            <button ref={closeRef} className="viewer__btn viewer__close" aria-label="Close viewer" onClick={onClose}>
                ✕
            </button>

            {count > 1 && (
                <button
                    className="viewer__btn viewer__prev"
                    aria-label="Previous photo"
                    onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + count) % count) }}
                >
                    ‹
                </button>
            )}

            <figure className="viewer__figure" onClick={(e) => e.stopPropagation()}>
                <img src={photo.src} alt={photo.alt} />
                <figcaption>
                    {photo.title} · {index + 1} / {count}
                </figcaption>
            </figure>

            {count > 1 && (
                <button
                    className="viewer__btn viewer__next"
                    aria-label="Next photo"
                    onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % count) }}
                >
                    ›
                </button>
            )}
        </div>,
        document.body
    )
}