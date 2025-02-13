import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify', 'pdfjs-dist'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
   hooks: {
    'vite:extendConfig': (config) => {
      config.plugins?.push(
        vuetify({
          styles: {
            configFile: './assets/settings.scss',
          },
        }),
      )
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/styles',
    '~/assets/styles/_global.scss',
  ],
  vite: {
    optimizeDeps: {
      include: ['pdfjs-dist'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf.worker': ['pdfjs-dist/build/pdf.worker.js'],
          },
        },
      },
    },
    resolve: {
      alias: {
        'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.js',
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern',
        },
      },
    },
  },
});
