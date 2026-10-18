import { useClock } from '../hooks/useClock'
import AppIcon from './AppIcon'

export default function Taskbar({ windows, apps, activeAppId, onToggle }) {
    const now = useClock()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

    return (
        <footer className="taskbar">
            <span className="taskbar__brand">2AM Cameraman</span>

            <div className="taskbar__apps">
                {windows.map((win) => {
                    const app = apps.find((a) => a.id === win.appId)
                    const isActive = win.appId === activeAppId
                    return (
                        <button
                            key={win.appId}
                            className={`taskbar__app${isActive ? ' taskbar__app--active' : ''}${win.minimized ? ' taskbar__app--minimized' : ''
                                }`}
                            aria-pressed={isActive}
                            data-taskbar-app={win.appId}
                            onClick={() => onToggle(win.appId)}
                        >
                            <AppIcon app={app} size={18} />
                            <span className="taskbar__app-name">{app.name}</span>
                        </button>
                    )
                })}
            </div>

            <span className="taskbar__clock">{time}</span>
        </footer>
    )
}