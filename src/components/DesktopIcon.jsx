import AppIcon from './AppIcon'

export default function DesktopIcon({ app, onOpen, index, pressed }) {
    return (
        <button
            className="desktop-icon"
            style={{ '--i': index }}
            data-desktop-app={app.id}
            aria-pressed={pressed}
            onClick={() => onOpen(app.id)}
        >
            <span className="desktop-icon__glyph">
                <AppIcon app={app} size={56} />
            </span>
            <span className="desktop-icon__label">{app.name}</span>
        </button>
    )
}