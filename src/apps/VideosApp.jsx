import { useState } from 'react'
import { videos } from '../data/videos'

function VideoCard({ video }) {
    const [playing, setPlaying] = useState(false)

    return (
        <li className="video-card">
            <div className="video-card__media">
                {playing ? (
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                    />
                ) : (
                    <button
                        className="video-card__play"
                        aria-label={`Play ${video.title}`}
                        onClick={() => setPlaying(true)}
                    >
                        <img
                            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
                        />
                        <span className="video-card__icon" aria-hidden="true">▶</span>
                    </button>
                )}
            </div>
            <h2 className="video-card__title">{video.title}</h2>
            <p className="video-card__desc">{video.description}</p>
        </li>
    )
}

export default function VideosApp() {
    if (videos.length === 0) {
        return <p className="gallery__empty">No videos yet. Add some in src/data/videos.js.</p>
    }

    return (
        <ul className="videos">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </ul>
    )
}