import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      // Service worker HANYA di production. Mengaktifkannya saat dev
      // membuat SW meng-cache asset lama, sehingga browser menampilkan
      // versi sebelumnya padahal source sudah berubah.
      devOptions: {
        enabled: false,
      },

      // Manifest — identitas aplikasi PWA
      manifest: {
        name:             'FreelancePro Dashboard',
        short_name:       'FreelancePro',
        description:      'Freelance Developer Tracking Dashboard',
        theme_color:      '#3b82f6',
        background_color: '#0f172a',
        display:          'standalone',  // tampil seperti native app (tanpa browser chrome)
        orientation:      'portrait',
        scope:            '/',
        start_url:        '/',
        icons: [
          {
            src:     '/icon-192.png',
            sizes:   '192x192',
            type:     'image/png',
            purpose: 'any',
          },
          {
            src:     '/icon-512.png',
            sizes:   '512x512',
            type:     'image/png',
            purpose: 'maskable',
          },
        ],
      },

      // Workbox: strategi caching
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        
        // Cache semua asset JS, CSS, HTML
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        // NetworkFirst untuk navigasi
        // coba ambil dari network, fallback ke cache jika offline
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})