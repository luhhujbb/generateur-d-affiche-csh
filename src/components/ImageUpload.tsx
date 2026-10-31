import { useId, useRef } from 'react'

interface ImageUploadProps {
  label: string
  value: string | null
  onChange: (dataUrl: string | null) => void
  accept?: string
  hint?: string
}

export function ImageUpload({
  label,
  value,
  onChange,
  accept = 'image/jpeg,image/png',
  hint,
}: ImageUploadProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="field image-upload">
      <label htmlFor={id}>{label}</label>
      {hint ? <p className="field-hint">{hint}</p> : null}
      <div className="image-upload-row">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {value ? (
          <div className="image-upload-preview">
            <img src={value} alt="" />
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                onChange(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
            >
              Retirer
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
