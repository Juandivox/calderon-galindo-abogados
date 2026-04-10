import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createReadStream, existsSync, statSync } from 'fs'
import { resolve, extname } from 'path'

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ai': 'application/postscript',
}

/**
 * Plugin que sirve la carpeta Image/ desde la raíz del proyecto durante `npm run dev`.
 * En build no hace nada — el Dockerfile copia Image/ al contenedor nginx manualmente.
 */
function serveRootImages() {
  return {
    name: 'serve-root-images',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (!url.startsWith('/Image/')) return next()

        const filePath = resolve(process.cwd(), url.slice(1))
        if (!existsSync(filePath) || !statSync(filePath).isFile()) return next()

        const mime = MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
        res.setHeader('Content-Type', mime)
        createReadStream(filePath).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveRootImages()],
})
