export default function DesktopIcon({ app, onOpen, index }) {
    return (
        <button
            className="desktop-icon"
            style={{ '--i': index }}
            onClick={() => onOpen(app.id)}
        >
            <span className="desktop-icon__glyph" aria-hidden="true">{app.icon}</span>
            <span className="desktop-icon__label">{app.name}</span>
        </button>
    )
}