import DesktopIcon from '../components/DesktopIcon'
import Taskbar from '../components/Taskbar'
import { apps } from './desktopConfig'

export default function Desktop() {
    const openApp = (id) => console.log('open', id) // real window system in Phase 2

    return (
        <div className="desktop">
            <video
                className="desktop__wallpaper"
                src="/videos/waves.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="desktop__overlay" />

            <nav className="desktop__icons" aria-label="Applications">
                {apps.map((app, i) => (
                    <DesktopIcon key={app.id} app={app} index={i} onOpen={openApp} />
                ))}
            </nav>

            <Taskbar />
        </div>
    )
}