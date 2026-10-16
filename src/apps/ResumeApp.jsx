import { profile } from '../data/profile'
import { resume } from '../data/resume'

export default function ResumeApp() {
    return (
        <article className="resume">
            <header className="resume__header">
                <div>
                    <h1 className="resume__name">{profile.name}</h1>
                    <p className="resume__role">{profile.role}</p>
                </div>
                <a className="resume__download" href="/my_resume.pdf" download="Max-Cavaness-Resume.pdf">
                    Download PDF
                </a>
            </header>

            <p className="resume__summary">{resume.summary}</p>

            <section>
                <h2 className="resume__heading">Experience</h2>
                {resume.experience.map((job) => (
                    <div className="resume__job" key={`${job.org}-${job.dates}`}>
                        <div className="resume__job-top">
                            <strong>{job.role}</strong>
                            <span className="resume__dates">{job.dates}</span>
                        </div>
                        <div className="resume__org">{job.org}</div>
                        <ul>
                            {job.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="resume__heading">Skills</h2>
                <ul className="resume__skills">
                    {resume.skills.map((s) => (
                        <li key={s}>{s}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="resume__heading">Education</h2>
                {resume.education.map((e) => (
                    <div className="resume__job-top" key={e.name}>
                        <span>{e.name}</span>
                        <span className="resume__dates">{e.dates}</span>
                    </div>
                ))}
            </section>
        </article>
    )
}