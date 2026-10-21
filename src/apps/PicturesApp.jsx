import { useState } from 'react'
import { photos } from '../data/photos'
import ImageViewer from './ImageViewer'

export default function PicturesApp() {
    const [openIndex, setOpenIndex] = useState(null)

    if (photos.length === 0) {
        return <p className="gallery__empty">No photos yet. Add images to src/assets/photos.</p>
    }

    return (
        <>
            <ul className="gallery">
                {photos.map((photo, i) => (
                    <li key={photo.id}>
                        <button
                            className="gallery__item"
                            aria-label={`View ${photo.title}`}
                            onClick={() => setOpenIndex(i)}
                        >
                            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                            <span className="gallery__title" aria-hidden="true">
                                <span className="gallery__title-text">{photo.title}</span>
                            </span>                        </button>
                    </li>
                ))}
            </ul>

            {openIndex !== null && (
                <ImageViewer
                    photos={photos}
                    index={openIndex}
                    onClose={() => setOpenIndex(null)}
                    onNavigate={setOpenIndex}
                />
            )}
        </>
    )
}