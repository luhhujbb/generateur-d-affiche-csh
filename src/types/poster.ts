export interface PosterData {
  authorName: string
  authorPhoto: string | null
  authorPhotoUseAlpha: boolean
  hasSecondAuthor: boolean
  secondAuthorName: string
  secondAuthorPhoto: string | null
  bookTitle: string
  bookCover: string | null
  conferenceTitle: string
  conferenceSubtitle: string
  date: string
  time: string
  venue: string
  address: string
  backgroundImage: string | null
  logo: string | null
}

/** Respects Vite `base` (e.g. `/generator/`) when deployed in a subfolder */
export const DEFAULT_LOGO = `${import.meta.env.BASE_URL}logo-2026-2027.png`

export const DEFAULT_POSTER_DATA: PosterData = {
  authorName: '',
  authorPhoto: null,
  authorPhotoUseAlpha: true,
  hasSecondAuthor: false,
  secondAuthorName: '',
  secondAuthorPhoto: null,
  bookTitle: '',
  bookCover: null,
  conferenceTitle: '',
  conferenceSubtitle: '',
  date: '',
  time: '19H30',
  venue: 'ÉGLISE SAINT-ROCH',
  address: '296 Rue Saint-Honoré / 75001 Paris',
  backgroundImage: null,
  logo: DEFAULT_LOGO,
}

export const FOOTER = {
  handle: '@cerclesthonore',
  websiteLabel: 'www.cerclesainthonore.fr',
  websiteUrl: 'https://www.cerclesainthonore.fr/',
  email: 'cerclesthonore@gmail.com',
  newsletter:
    'Pour ne rien rater, abonnez-vous à notre lettre de liaison :',
  social: {
    facebook:
      'https://www.facebook.com/p/Cercle-Saint-Honor%C3%A9-100089446511533/',
    instagram: 'https://www.instagram.com/cerclesainthonore/',
    youtube: 'https://www.youtube.com/@cerclesthonore',
  },
} as const
