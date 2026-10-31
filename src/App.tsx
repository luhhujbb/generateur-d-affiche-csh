import { useCallback, useEffect, useRef, useState } from 'react'
import { PosterA4 } from './components/PosterA4'
import { PosterForm } from './components/PosterForm'
import {
  DEFAULT_POSTER_DATA,
  type PosterData,
} from './types/poster'
import './styles/app.css'
import './styles/poster.css'
import './styles/print.css'

export default function App() {
  const [data, setData] = useState<PosterData>(DEFAULT_POSTER_DATA)
  const frameRef = useRef<HTMLDivElement>(null)
  const scalerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)

  const onChange = useCallback((patch: Partial<PosterData>) => {
    setData((prev) => ({ ...prev, ...patch }))
  }, [])

  const onExportPdf = useCallback(() => {
    window.print()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    const scaler = scalerRef.current
    if (!frame || !scaler) return

    const update = () => {
      const poster = scaler.querySelector('.poster-a4') as HTMLElement | null
      if (!poster) return
      // offsetWidth ignores CSS transforms — true A4 layout width in px
      const naturalWidth = poster.offsetWidth
      const frameWidth = frame.clientWidth
      if (naturalWidth > 0 && frameWidth > 0) {
        setScale(frameWidth / naturalWidth)
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    observer.observe(scaler)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="app-shell no-print">
        <PosterForm data={data} onChange={onChange} onExportPdf={onExportPdf} />

        <aside className="preview-pane" aria-label="Aperçu en direct de l'affiche">
          <p className="preview-label">Aperçu A4 — mise à jour en direct</p>
          <div className="preview-frame" ref={frameRef}>
            <div
              className="preview-scaler"
              ref={scalerRef}
              style={{ transform: `scale(${scale})` }}
            >
              <PosterA4 data={data} />
            </div>
          </div>
        </aside>
      </div>

      <div className="print-root">
        <PosterA4 data={data} />
      </div>
    </>
  )
}
