import { useId } from 'react'
import type { PosterData } from '../types/poster'
import { DEFAULT_LOGO, FOOTER } from '../types/poster'

interface PosterA4Props {
  data: PosterData
}

function SocialIcons() {
  const igGradientId = useId()

  return (
    <div className="poster-social-icons">
      <a
        className="poster-social-link"
        href={FOOTER.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook — Cercle Saint Honoré"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" className="icon-fb" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            fill="#fff"
            d="M13.5 8.5h1.7V6.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.5H7v2.7h2v6.8h2.7v-6.8h2.3l.5-2.7h-2.8V10c0-.8.2-1.5 1.3-1.5z"
          />
        </svg>
      </a>
      <a
        className="poster-social-link"
        href={FOOTER.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram — Cercle Saint Honoré"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" className="icon-ig" aria-hidden="true">
          <defs>
            <linearGradient id={igGradientId} x1="0" y1="24" x2="24" y2="0">
              <stop stopColor="#f58529" />
              <stop offset=".5" stopColor="#dd2a7b" />
              <stop offset="1" stopColor="#515bd4" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="12" fill={`url(#${igGradientId})`} />
          <rect
            x="7"
            y="7"
            width="10"
            height="10"
            rx="3"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <circle cx="15.5" cy="8.5" r="0.9" fill="#fff" />
        </svg>
      </a>
      <a
        className="poster-social-link"
        href={FOOTER.social.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube — Cercle Saint Honoré"
        title="YouTube"
      >
        <svg viewBox="0 0 24 24" className="icon-yt" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#FF0000" />
          <path fill="#fff" d="M10 8.5v7l6-3.5-6-3.5z" />
        </svg>
      </a>
    </div>
  )
}

function titleSizeClass(title: string): string {
  const len = title.trim().length
  if (len > 60) return 'poster-conference-title poster-conference-title--xl'
  if (len > 40) return 'poster-conference-title poster-conference-title--long'
  return 'poster-conference-title'
}

function AuthorPhoto({
  src,
  alt,
  useAlpha,
  side,
}: {
  src: string | null
  alt: string
  useAlpha: boolean
  side: 'left' | 'right' | 'single'
}) {
  if (!src) {
    const placeholderClass =
      side === 'left'
        ? 'poster-author-placeholder poster-author-placeholder--left'
        : side === 'right'
          ? 'poster-author-placeholder poster-author-placeholder--right'
          : 'poster-author-placeholder'
    return <div className={placeholderClass}>Photo auteur</div>
  }

  if (useAlpha) {
    const alphaClass =
      side === 'left'
        ? 'poster-author-photo--alpha poster-author-photo--alpha-left'
        : side === 'right'
          ? 'poster-author-photo--alpha poster-author-photo--alpha-right'
          : 'poster-author-photo--alpha'
    return <img className={alphaClass} src={src} alt={alt} />
  }

  const circleClass =
    side === 'left'
      ? 'poster-author-circle poster-author-circle--left'
      : side === 'right'
        ? 'poster-author-circle poster-author-circle--right'
        : 'poster-author-circle'

  return (
    <div className={circleClass}>
      <img src={src} alt={alt} />
    </div>
  )
}

function AuthorBand({ data }: { data: PosterData }) {
  const duo = data.hasSecondAuthor
  const useAlpha = data.authorPhotoUseAlpha

  const bandClass = [
    'poster-author-band',
    !useAlpha ? 'poster-author-band--opaque' : '',
    duo ? 'poster-author-band--duo' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={bandClass}
      style={
        data.backgroundImage
          ? { backgroundImage: `url(${data.backgroundImage})` }
          : undefined
      }
    >
      <div className="poster-author-band-overlay" />

      {duo ? (
        <>
          <AuthorPhoto
            src={data.authorPhoto}
            alt={data.authorName || 'Auteur 1'}
            useAlpha={useAlpha}
            side="left"
          />
          <AuthorPhoto
            src={data.secondAuthorPhoto}
            alt={data.secondAuthorName || 'Auteur 2'}
            useAlpha={useAlpha}
            side="right"
          />
          {data.authorName ? (
            <h2 className="poster-author-name poster-author-name--top">
              {data.authorName}
            </h2>
          ) : null}
          {data.secondAuthorName ? (
            <h2 className="poster-author-name poster-author-name--bottom">
              {data.secondAuthorName}
            </h2>
          ) : null}
        </>
      ) : (
        <>
          <AuthorPhoto
            src={data.authorPhoto}
            alt={data.authorName || 'Auteur'}
            useAlpha={useAlpha}
            side="single"
          />
          {data.authorName ? (
            <h2 className="poster-author-name">{data.authorName}</h2>
          ) : null}
        </>
      )}
    </section>
  )
}

export function PosterA4({ data }: PosterA4Props) {
  const logoSrc = data.logo ?? DEFAULT_LOGO

  return (
    <article className="poster-a4" aria-label="Aperçu de l'affiche A4">
      <header className="poster-header">
        <div className="poster-logo">
          <img src={logoSrc} alt="Conférences Saint Honoré" />
        </div>
        <div className="poster-event">
          {data.date ? <p className="poster-event-date">{data.date}</p> : null}
          {data.time ? <p className="poster-event-time">{data.time}</p> : null}
          {data.venue ? <p className="poster-event-venue">{data.venue}</p> : null}
          {data.address ? (
            <p className="poster-event-address">{data.address}</p>
          ) : null}
        </div>
      </header>

      <AuthorBand data={data} />

      <section className="poster-title-band">
        <div className="poster-title-block">
          {data.conferenceTitle ? (
            <h1 className={titleSizeClass(data.conferenceTitle)}>
              {data.conferenceTitle}
            </h1>
          ) : (
            <p className="poster-title-placeholder">Titre de la conférence</p>
          )}
          {data.conferenceSubtitle ? (
            <p className="poster-conference-subtitle">
              {data.conferenceSubtitle}
            </p>
          ) : null}
        </div>
        <div className="poster-book">
          {data.bookCover ? (
            <img
              src={data.bookCover}
              alt={data.bookTitle || 'Couverture du livre'}
            />
          ) : (
            <div className="poster-book-placeholder">Couverture</div>
          )}
        </div>
      </section>

      <footer className="poster-footer">
        <div className="poster-footer-left">
          <p className="poster-handle">{FOOTER.handle}</p>
          <SocialIcons />
        </div>
        <div className="poster-footer-right">
          <p className="poster-website">
            <a
              href={FOOTER.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {FOOTER.websiteLabel}
            </a>
          </p>
          <p className="poster-newsletter">{FOOTER.newsletter}</p>
          <p className="poster-email">
            <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a>
          </p>
        </div>
      </footer>
    </article>
  )
}
