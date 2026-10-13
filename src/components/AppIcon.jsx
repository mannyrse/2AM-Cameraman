export default function AppIcon({ app, size = 18 }) {
    if (app.Icon) {
        const Icon = app.Icon
        return <Icon size={size} />
    }
    if (app.iconSrc) {
        return (
            <img
                className="app-icon"
                src={app.iconSrc}
                width={size}
                height={size}
                alt=""
                draggable="false"
            />
        )
    }
    return (
        <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>
            {app.icon}
        </span>
    )
}