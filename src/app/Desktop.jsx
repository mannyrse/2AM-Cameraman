import DesktopIcon from '../components/DesktopIcon'
import Taskbar from '../components/Taskbar'
import WindowFrame from '../components/WindowFrame'
import { useWindowManager } from '../hooks/useWindowManager'
import { apps } from './desktopConfig'

export default function Desktop() {
    const { windows, activeAppId, openApp, closeApp, focusApp, moveApp, minimizeApp, toggleApp } = useWindowManager()

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

            {windows.map((win) => {
                const app = apps.find((a) => a.id === win.appId)
                return (
                    <WindowFrame
                        key={win.appId}
                        app={app}
                        win={win}
                        isActive={win.appId === activeAppId}
                        onFocus={focusApp}
                        onClose={closeApp}
                        onMove={moveApp}
                        onMinimize={minimizeApp}
                    >
                        {app.Component ? <app.Component /> : <p>{app.name} content coming soon.</p>}
                    </WindowFrame>
                )
            })}

            <Taskbar windows={windows} apps={apps} activeAppId={activeAppId} onToggle={toggleApp} />
        </div>
    )
}