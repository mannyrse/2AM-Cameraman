import { useEffect, useRef } from 'react'
import DesktopIcon from '../components/DesktopIcon'
import MobileWidget from '../components/MobileWidget'
import Taskbar from '../components/Taskbar'
import WindowFrame from '../components/WindowFrame'
import { useWindowManager } from '../hooks/useWindowManager'
import { useMotion } from '../hooks/useMotion'
import { useIsMobile } from '../hooks/useIsMobile'
import { apps } from './desktopConfig'

export default function Desktop() {
    const {
        windows, activeAppId, openApp, closeApp, focusApp,
        moveApp, resizeApp, minimizeApp, maximizeApp, toggleApp,
    } = useWindowManager()

    const videoRef = useRef(null)
    const isMobile = useIsMobile()
    const [motion, setMotion] = useMotion()
    const reduced = motion === 'reduced'

    // Pause the wallpaper when motion is reduced
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        if (reduced) video.pause()
        else video.play()?.catch(() => { })
    }, [reduced])

    const activate = (id) => {
        const app = apps.find((a) => a.id === id)
        if (app?.toggle) setMotion(reduced ? 'full' : 'reduced')
        else openApp(id)
    }

    // Toggle apps (Motion) go last. Its label shows the current state.
    const iconApps = [
        ...apps.filter((a) => !a.toggle),
        ...apps.filter((a) => a.toggle),
    ].map((a) => (a.toggle ? { ...a, name: reduced ? 'Motion: Off' : 'Motion: On' } : a))

    const icons = (
        <nav className="desktop__icons" aria-label="Applications">
            {iconApps.map((app, i) => (
                <DesktopIcon
                    key={app.id}
                    app={app}
                    index={i}
                    pressed={app.toggle ? reduced : undefined}
                    onOpen={activate}
                />
            ))}
        </nav>
    )

    return (
        <div className="desktop">
            <h1 className="visually-hidden">
                2AM Cameraman: Max Cavaness, photographer and videographer in River Falls, WI
            </h1>

            <video
                ref={videoRef}
                className="desktop__wallpaper"
                src="/videos/waves.mp4"
                poster="/waves-poster.png"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
            />

            {isMobile ? (
                <div className="desktop__home">
                    <MobileWidget />
                    {icons}
                </div>
            ) : (
                icons
            )}

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
                        onResize={resizeApp}
                        onMinimize={minimizeApp}
                        onMaximize={maximizeApp}
                    >
                        {app.Component ? <app.Component /> : <p>{app.name} content coming soon.</p>}
                    </WindowFrame>
                )
            })}

            <Taskbar
                windows={windows}
                apps={apps}
                menuApps={iconApps}
                activeAppId={activeAppId}
                onToggle={toggleApp}
                onLaunch={activate}
            />
        </div>
    )
}