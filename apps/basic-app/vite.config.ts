import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  build: {
    emptyOutDir: true,
  },
})
