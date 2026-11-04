import type { PosterData } from '../types/poster'
import { DEFAULT_LOGO } from '../types/poster'
import { ImageUpload } from './ImageUpload'

interface PosterFormProps {
  data: PosterData
  onChange: (patch: Partial<PosterData>) => void
  onExportPdf: () => void
}

export function PosterForm({ data, onChange, onExportPdf }: PosterFormProps) {
  return (
    <form
      className="poster-form no-print"
      onSubmit={(e) => e.preventDefault()}
    >
      <header className="form-header">
        <h1>Générateur d&apos;affiche</h1>
        <p>Conférences Saint Honoré — format A4</p>
      </header>

      <fieldset>
        <legend>Événement</legend>
        <div className="field">
          <label htmlFor="conferenceTitle">Titre de la conférence</label>
          <textarea
            id="conferenceTitle"
            rows={2}
            value={data.conferenceTitle}
            onChange={(e) => onChange({ conferenceTitle: e.target.value })}
            placeholder="LE GÉNIE DU CHRISTIANISME 2.0"
          />
        </div>
        <div className="field">
          <label htmlFor="conferenceSubtitle">Sous-titre (optionnel)</label>
          <input
            id="conferenceSubtitle"
            type="text"
            value={data.conferenceSubtitle}
            onChange={(e) => onChange({ conferenceSubtitle: e.target.value })}
            placeholder="Les enseignements d'un retour à la vie…"
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="text"
              value={data.date}
              onChange={(e) => onChange({ date: e.target.value })}
              placeholder="12 SEPTEMBRE"
            />
          </div>
          <div className="field">
            <label htmlFor="time">Heure</label>
            <input
              id="time"
              type="text"
              value={data.time}
              onChange={(e) => onChange({ time: e.target.value })}
              placeholder="19H30"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="venue">Lieu</label>
          <input
            id="venue"
            type="text"
            value={data.venue}
            onChange={(e) => onChange({ venue: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="address">Adresse</label>
          <input
            id="address"
            type="text"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Auteur{data.hasSecondAuthor ? 's' : ''}</legend>
        <div className="field">
          <label htmlFor="authorName">
            Nom de l&apos;auteur{data.hasSecondAuthor ? ' 1' : ''}
          </label>
          <input
            id="authorName"
            type="text"
            value={data.authorName}
            onChange={(e) => onChange({ authorName: e.target.value })}
            placeholder="CHRISTOPHE DICKÈS"
          />
        </div>
        <ImageUpload
          label={
            data.hasSecondAuthor
              ? "Photo de l'auteur 1 (JPG / PNG)"
              : "Photo de l'auteur (JPG / PNG)"
          }
          value={data.authorPhoto}
          onChange={(authorPhoto) => onChange({ authorPhoto })}
          hint="Préférez un PNG détouré pour un rendu sans fond."
        />
        <div className="field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={data.hasSecondAuthor}
              onChange={(e) => {
                const hasSecondAuthor = e.target.checked
                onChange(
                  hasSecondAuthor
                    ? { hasSecondAuthor }
                    : {
                        hasSecondAuthor,
                        secondAuthorName: '',
                        secondAuthorPhoto: null,
                      },
                )
              }}
            />
            Ajouter un second auteur
          </label>
        </div>
        {data.hasSecondAuthor ? (
          <>
            <div className="field">
              <label htmlFor="secondAuthorName">Nom de l&apos;auteur 2</label>
              <input
                id="secondAuthorName"
                type="text"
                value={data.secondAuthorName}
                onChange={(e) =>
                  onChange({ secondAuthorName: e.target.value })
                }
                placeholder="NOM DU SECOND AUTEUR"
              />
            </div>
            <ImageUpload
              label="Photo de l'auteur 2 (JPG / PNG)"
              value={data.secondAuthorPhoto}
              onChange={(secondAuthorPhoto) => onChange({ secondAuthorPhoto })}
            />
          </>
        ) : null}
        <div className="field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={data.authorPhotoUseAlpha}
              onChange={(e) =>
                onChange({ authorPhotoUseAlpha: e.target.checked })
              }
            />
            Utiliser le canal alpha (transparence PNG)
            {data.hasSecondAuthor ? ' — pour les deux photos' : ''}
          </label>
        </div>
        <ImageUpload
          label="Image de fond (bande auteur)"
          value={data.backgroundImage}
          onChange={(backgroundImage) => onChange({ backgroundImage })}
        />
      </fieldset>

      <fieldset>
        <legend>Livre</legend>
        <div className="field">
          <label htmlFor="bookTitle">Nom du livre</label>
          <input
            id="bookTitle"
            type="text"
            value={data.bookTitle}
            onChange={(e) => onChange({ bookTitle: e.target.value })}
            placeholder="POUR L'ÉGLISE"
          />
        </div>
        <ImageUpload
          label="Couverture du livre (JPG / PNG)"
          value={data.bookCover}
          onChange={(bookCover) => onChange({ bookCover })}
          hint="Idéalement un mockup 3D du livre."
        />
      </fieldset>

      <fieldset>
        <legend>Identité</legend>
        <ImageUpload
          label="Logo"
          value={data.logo === DEFAULT_LOGO ? null : data.logo}
          onChange={(logo) => onChange({ logo: logo ?? DEFAULT_LOGO })}
          hint="Par défaut : logo Conférences Saint Honoré 2026-2027."
        />
        {data.logo === DEFAULT_LOGO ? (
          <p className="field-hint">Logo 2026-2027 actuellement utilisé.</p>
        ) : null}
      </fieldset>

      <div className="form-actions">
        <button type="button" className="btn-primary" onClick={onExportPdf}>
          Exporter en PDF
        </button>
      </div>
    </form>
  )
}
