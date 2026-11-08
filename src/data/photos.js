const fullFiles = import.meta.glob('../assets/photos/full/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})

const thumbFiles = import.meta.glob('../assets/photos/thumbs/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})

const fileName = (p) => p.split('/').pop().replace(/\.[^.]+$/, '')

const thumbsByName = Object.fromEntries(
    Object.entries(thumbFiles).map(([path, src]) => [fileName(path), src]),
)

export const photos = Object.entries(fullFiles)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
        const name = fileName(path)
        const title = name.replace(/[-_]+/g, ' ')
        return { id: name, src, thumb: thumbsByName[name] ?? src, title, alt: title }
    })