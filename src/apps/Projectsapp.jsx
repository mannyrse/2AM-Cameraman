import { useState } from 'react'
import { projects } from '../data/projects'

export default function ProjectsApp() {
    const [selectedId, setSelectedId] = useState(null)
    const project = projects.find((p) => p.id === selectedId)

    if (projects.length === 0) {
        return <p className="gallery__empty">No projects yet. Add some in src/data/projects.js.</p>
    }

    if (project) {
        return (
            <article className="project">
                <button className="project__back" onClick={() => setSelectedId(null)}>
                    ‹ All projects
                </button>
                <img className="project__cover" src={project.cover} alt="" />
                <h1 className="project__title">{project.title}</h1>
                <p className="project__meta">
                    {project.role} · {project.date}
                </p>
                <ul className="project__tags">
                    {project.tags.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
                <p className="project__overview">{project.overview}</p>
                {project.link && (
                    <a className="project__link" href={project.link.href} target="_blank" rel="noreferrer">
                        {project.link.label} ↗
                    </a>
                )}
            </article>
        )
    }

    return (
        <ul className="projects">
            {projects.map((p) => (
                <li key={p.id}>
                    <button className="project-card" onClick={() => setSelectedId(p.id)}>
                        <img src={p.cover} alt="" loading="lazy" decoding="async" />
                        <span className="project-card__title">{p.title}</span>
                        <span className="project-card__summary">{p.summary}</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}