import { useClock } from '../hooks/useClock'

export default function Taskbar() {
    const now = useClock()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

    return (
        <footer className="taskbar">
            <span className="taskbar__brand">2AM Cameraman</span>
            <span className="taskbar__clock">{time}</span>
        </footer>
    )
}