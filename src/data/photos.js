const files = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})

export const photos = Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
        const name = path.split('/').pop().replace(/\.[^.]+$/, '')
        const title = name.replace(/[-_]+/g, ' ')
        return { id: name, src, title, alt: title }
    })