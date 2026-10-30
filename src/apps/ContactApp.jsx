import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

export default function ContactApp() {
    const socials = profile.links.filter((l) => !l.href.startsWith('mailto:'))
    const [status, setStatus] = useState('idle') // 'idle' | 'copied' | 'failed'
    const timer = useRef(null)

    useEffect(() => () => clearTimeout(timer.current), [])

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email)
            setStatus('copied')
        } catch {
            setStatus('failed')
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setStatus('idle'), 2000)
    }

    const label =
        status === 'copied' ? 'Copied!' : status === 'failed' ? 'Copy failed, select the address' : 'Copy email'

    return (
        // maybe replace the copy button with a custom contact form later
        <section className="contact">
            <h1 className="contact__title">Let's work together</h1>
            <p className="contact__intro">
                Have a project in mind or just want to say hi? Email is the fastest way to reach me.
            </p>

            <button type="button" className="contact__cta" onClick={copyEmail} aria-live="polite">
                {label}
            </button>
            <p className="contact__address">{profile.email}</p>

            <ul className="contact__links">
                {socials.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}