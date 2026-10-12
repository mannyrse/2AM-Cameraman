export default function WindowFrame({ app, win, isActive, onFocus, onClose, children }) {
    return (
        <section
            className={`window${isActive ? ' window--active' : ''}`}
            style={{
                left: win.position.x,
                top: win.position.y,
                width: app.width,
                height: app.height,
                zIndex: win.zIndex,
            }}
            onPointerDown={() => onFocus(app.id)}
            aria-label={app.name}
        >
            <header className="window__titlebar">
                <span className="window__title">
                    <span aria-hidden="true">{app.icon}</span> {app.name}
                </span>
                <button
                    className="window__close"
                    aria-label={`Close ${app.name}`}
                    onClick={() => onClose(app.id)}
                >
                    ✕
                </button>
            </header>
            <div className="window__content">{children}</div>
        </section>
    )
}