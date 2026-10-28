import AboutIcon from '../components/icons/AboutIcon'
import PicturesIcon from '../components/icons/PicturesIcon'
import VideosIcon from '../components/icons/VideosIcon'
import ContactIcon from '../components/icons/ContactIcon'
import MotionIcon from '../components/icons/MotionIcon'
import PaintIcon from '../components/icons/PaintIcon'
import ProjectsIcon from '../components/icons/ProjectsIcon'
import AboutApp from '../apps/AboutApp'
import PicturesApp from '../apps/PicturesApp'
import VideosApp from '../apps/VideosApp'
import ContactApp from '../apps/ContactApp'
import ResumeApp from '../apps/ResumeApp'
import ProjectsApp from '../apps/Projectsapp'
import PaintApp from '../apps/PaintApp'

export const apps = [
    { id: 'about', name: 'About Me', icon: '👤', Icon: AboutIcon, Component: AboutApp, width: 640, height: 480 },
    { id: 'pictures', name: 'Pictures', icon: '🖼️', Icon: PicturesIcon, Component: PicturesApp, width: 860, height: 600 },
    { id: 'videos', name: 'Videos', icon: '🎬', Icon: VideosIcon, Component: VideosApp, width: 860, height: 600 },
    { id: 'contact', name: 'Contact', icon: '✉️', Icon: ContactIcon, Component: ContactApp, width: 480, height: 420 },
    { id: 'motion', name: 'Motion', icon: '🎞️', Icon: MotionIcon, toggle: true },
    { id: 'resume', name: 'Resume', icon: '📄', Component: ResumeApp, width: 640, height: 560 },
    { id: 'projects', name: 'Projects', icon: '🗂️', Icon: ProjectsIcon, Component: ProjectsApp, width: 760, height: 560 },
    { id: 'paint', name: 'MXPaint', icon: '🎨', Icon: PaintIcon, Component: PaintApp, width: 700, height: 620 },
]