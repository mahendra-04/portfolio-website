import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite build configuration for the portfolio.
// The React plugin enables JSX/Fast Refresh during development. A relative base
// keeps the production build portable across GitHub Pages, preview servers, and
// other subdirectory hosting paths. Use a dev/preview server for local testing;
// browser security rules can block ES modules when dist/index.html is opened
// directly from the filesystem.
export default defineConfig({
  plugins: [react()],
  base: './',
})
