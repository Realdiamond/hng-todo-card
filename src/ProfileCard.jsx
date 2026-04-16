import { useEffect, useState } from 'react'
import './ProfileCard.css'

const PROFILE = {
  name: 'Real Diamond',
  bio: 'Frontend engineer focused on accessible interfaces, smooth interactions, and clean implementation details.',
  avatar: '/profile-avatar.svg',
  socialLinks: {
    github: 'https://github.com/Realdiamond',
    linkedin: 'https://www.linkedin.com/in/realdiamond',
    twitter: 'https://x.com',
  },
  hobbies: ['Design systems', 'Technical writing', 'Music', 'Travel'],
  dislikes: ['Missed deadlines', 'Ambiguous requirements', 'Cluttered UI', 'Slow feedback loops'],
}

function ProfileCard() {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className="profile-page">
      <article className="profile-card" data-testid="test-profile-card" aria-label="User profile card">
        <header className="profile-header">
          <figure className="avatar-wrap">
            <img
              className="avatar"
              src={PROFILE.avatar}
              alt="Profile avatar of Real Diamond"
              data-testid="test-user-avatar"
            />
          </figure>

          <div className="identity-block">
            <h2 data-testid="test-user-name">{PROFILE.name}</h2>
            <p data-testid="test-user-bio">{PROFILE.bio}</p>
            <time
              data-testid="test-user-time"
              dateTime={new Date(currentTime).toISOString()}
              aria-live="polite"
            >
              {currentTime}
            </time>
          </div>
        </header>

        <nav className="social-nav" aria-label="Social links" data-testid="test-user-social-links">
          <a
            href={PROFILE.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            data-testid="test-user-social-github"
          >
            GitHub
          </a>
          <a
            href={PROFILE.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            data-testid="test-user-social-linkedin"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.socialLinks.twitter}
            target="_blank"
            rel="noreferrer"
            data-testid="test-user-social-twitter"
          >
            Twitter
          </a>
        </nav>

        <section className="interest-grid" aria-label="Hobbies and dislikes">
          <div>
            <h3>Hobbies</h3>
            <ul data-testid="test-user-hobbies">
              {PROFILE.hobbies.map((hobby) => (
                <li key={hobby}>{hobby}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Dislikes</h3>
            <ul data-testid="test-user-dislikes">
              {PROFILE.dislikes.map((dislike) => (
                <li key={dislike}>{dislike}</li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </main>
  )
}

export default ProfileCard
