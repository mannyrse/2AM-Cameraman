import { profile } from '../data/profile'

export default function AboutApp() {
    return (
        <article className="about">
            <img
                className="about__portrait"
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
            />
            <div className="about__text">
                <h1 className="about__name">{profile.name}</h1>
                <p className="about__role">
                    {profile.tagline} · {profile.role}
                </p>
                {profile.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
                <ul className="about__links">
                    {profile.links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} target="_blank" rel="noreferrer">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}