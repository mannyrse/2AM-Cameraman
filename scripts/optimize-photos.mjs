import { readdir, mkdir, access } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT = 'photos-original'
const FULL_DIR = 'src/assets/photos/full'
const THUMB_DIR = 'src/assets/photos/thumbs'
const FULL_SIZE = 2000 // long edge in px
const THUMB_SIZE = 500 // long edge in px
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const exists = (file) =>
    access(file).then(
        () => true,
        () => false,
    )

async function makeVersion(inputFile, outputFile, size, quality) {
    await sharp(inputFile)
        .rotate() // apply EXIF orientation
        .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputFile)
}

async function main() {
    await mkdir(FULL_DIR, { recursive: true })
    await mkdir(THUMB_DIR, { recursive: true })

    const entries = await readdir(INPUT)
    const images = entries.filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    const skipped = entries.filter((f) => !EXTENSIONS.has(path.extname(f).toLowerCase()))

    if (skipped.length) {
        console.log(`Ignoring unsupported files (convert HEIC to JPG first): ${skipped.join(', ')}`)
    }

    let done = 0
    for (const file of images) {
        const base = path.parse(file).name
        const input = path.join(INPUT, file)
        const fullOut = path.join(FULL_DIR, `${base}.jpg`)
        const thumbOut = path.join(THUMB_DIR, `${base}.jpg`)

        if ((await exists(fullOut)) && (await exists(thumbOut))) {
            console.log(`skip   ${file}`)
            continue
        }

        await makeVersion(input, fullOut, FULL_SIZE, 80)
        await makeVersion(input, thumbOut, THUMB_SIZE, 75)
        done += 1
        console.log(`done   ${file}`)
    }

    console.log(`\nProcessed ${done} new photo(s), ${images.length - done} already existed.`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})