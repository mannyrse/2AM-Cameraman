import defaultCover from '../assets/images/sky_to_sunrise_trans_copy.jpg'
import miku from '../assets/images/hatsune_miku.jpg'

export const projects = [
    {
        id: 'personal-site',
        title: '2am cameraman website',
        cover: defaultCover,
        date: '2022-2026',
        role: 'Photographer & editor',
        tags: ['Photography', 'Landscape'],
        summary: 'A short line about this project.',
        overview:
            'Placeholder: a website that was supposed to be made four years ago but is finally seeing substantial progress now.',
        link: { label: 'View on Instagram', href: 'https://instagram.com/your-handle' },
    },
    {
        id: 'miku',
        title: 'hatsune of the miku variety',
        cover: miku,
        date: '2026',
        role: 'artist',
        tags: ['religion', 'modern work of art'],
        summary: 'created for the accountability bot.',
        overview:
            'Placeholder: original artist of the piece.',
    },
]