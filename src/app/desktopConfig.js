import ContactIcon from '../components/icons/ContactIcon'
import AboutApp from '../apps/AboutApp'
import ContactApp from '../apps/ContactApp'
import PicturesApp from '../apps/PicturesApp'

export const apps = [
    { id: 'about', name: 'About Me', icon: '👤', Component: AboutApp, width: 640, height: 480 },
    { id: 'pictures', name: 'Pictures', icon: '🖼️', Component: PicturesApp, width: 860, height: 600 }, { id: 'videos', name: 'Videos', icon: '🎬', width: 860, height: 600 },
    { id: 'contact', name: 'Contact', icon: '✉️', Icon: ContactIcon, Component: ContactApp, width: 480, height: 420 },]