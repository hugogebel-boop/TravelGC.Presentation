import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Base auto:
 * - En CI GitHub Pages: base = "/<repo>/" (sauf User/Org Pages: "/")
 * - En local/dev: base = "/"
 */
const repo = process.env.REPO_NAME ?? ''
const isPages = process.env.GITHUB_PAGES === 'true'
const isUserOrgPage = repo.endsWith('.github.io')

export default defineConfig({
  plugins: [react()],
  base: isPages ? (isUserOrgPage || !repo ? '/' : `/${repo}/`) : '/',
})
