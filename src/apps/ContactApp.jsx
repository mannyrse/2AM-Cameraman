import { profile } from '../data/profile'

export default function ContactApp() {
    const socials = profile.links.filter((l) => !l.href.startsWith('mailto:'))

    return (
        // add other socials later and maybe remove the email button in favor of custom contact form
        <section className="contact">
            <h1 className="contact__title">Let's work together</h1>
            <p className="contact__intro">
                Have a project in mind or just want to say hi? Email is the fastest way to reach me.
            </p>

            <a className="contact__cta" href={`mailto:${profile.email}`}>
                Email me
            </a>
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