import { useClock } from '../hooks/useClock'
import { profile } from '../data/profile'

export default function MobileWidget() {
    const now = useClock()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

    return (
        <aside className="mobile-widget" aria-label="Welcome">
            <p className="mobile-widget__time">{time}</p>
            <p className="mobile-widget__date">{date}</p>
            <p className="mobile-widget__name">{profile.name}</p>
            <p className="mobile-widget__role">
                {profile.tagline} · {profile.role}
            </p>
        </aside>
    )
}