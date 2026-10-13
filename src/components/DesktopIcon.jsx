import AppIcon from './AppIcon'

export default function DesktopIcon({ app, onOpen, index }) {
    return (
        <button
            className="desktop-icon"
            style={{ '--i': index }}
            onClick={() => onOpen(app.id)}
        >
            <span className="desktop-icon__glyph">
                <AppIcon app={app} size={56} />
            </span>
            <span className="desktop-icon__label">{app.name}</span>
        </button>
    )
}