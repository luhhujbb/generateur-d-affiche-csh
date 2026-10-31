import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Normalize to Vite form: leading + trailing slash, e.g. `/generator/` */
function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/'
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

// BASE_PATH=/generator  →  assets under /generator/
// Or: npm run build -- --base=/generator/
export default defineConfig({
  plugins: [react()],
  base: normalizeBase(process.env.BASE_PATH),
})
