import { useEffect, useRef, useState } from 'react'
import { videos } from '../data/videos'

function Thumb({ video, onSelect }) {
    return (
        <button
            className="vthumb"
            aria-label={`Play ${video.title}`}
            onClick={() => onSelect(video.id)}
        >
            <span className="vthumb__media">
                <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                />
                <span className="vthumb__icon" aria-hidden="true">▶</span>
            </span>
            <span className="vthumb__title">{video.title}</span>
            <span className="vthumb__desc">{video.description}</span>
        </button>
    )
}

export default function VideosApp() {
    const [selectedId, setSelectedId] = useState(null)
    const rootRef = useRef(null)
    const video = videos.find((v) => v.id === selectedId)

    // Start at the top of the window whenever the view changes
    useEffect(() => {
        rootRef.current?.closest('.window__content')?.scrollTo({ top: 0 })
    }, [selectedId])

    if (videos.length === 0) {
        return <p className="gallery__empty">No videos yet. Add some in src/data/videos.js.</p>
    }

    if (!video) {
        return (
            <div className="videos-app" ref={rootRef}>
                <ul className="videos-grid">
                    {videos.map((v) => (
                        <li key={v.id}>
                            <Thumb video={v} onSelect={setSelectedId} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    const others = videos.filter((v) => v.id !== video.id)
    const hasDetails = video.details?.length > 0

    return (
        <div className="videos-app" ref={rootRef}>
            <div className={`video-stage${hasDetails ? '' : ' video-stage--solo'}`}>
                <button className="video-back" onClick={() => setSelectedId(null)}>
                    ‹ All videos
                </button>

                <div className="video-stage__main">
                    <div className="video-stage__player">
                        <iframe
                            key={video.id}
                            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                            title={video.title}
                            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                        />
                    </div>
                    <h1 className="video-stage__title">{video.title}</h1>
                    <p className="video-stage__sub">{video.description}</p>
                </div>

                {hasDetails && (
                    <aside className="video-stage__details">
                        {video.details.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </aside>
                )}

                {others.length > 0 && (
                    <section className="video-stage__more" aria-labelledby="more-videos-heading">
                        <h2 id="more-videos-heading" className="video-stage__more-title">
                            More videos
                        </h2>
                        <ul className="videos-grid videos-grid--small">
                            {others.map((v) => (
                                <li key={v.id}>
                                    <Thumb video={v} onSelect={setSelectedId} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    )
}