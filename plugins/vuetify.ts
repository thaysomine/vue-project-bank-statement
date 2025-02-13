import { createVuetify } from 'vuetify'
import { md2 } from 'vuetify/blueprints'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VDateInput } from 'vuetify/labs/VDateInput'

/**
 * There is no official guide for using Vuetify with Nuxt.
 * https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
 * https://vuetifyjs.com/en/features/treeshaking/
 */

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md2,
    components: {
      VDateInput,
    },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: false,
    display: {
      mobileBreakpoint: 900,
    },
    theme: {
      defaultTheme: 'dark',
      variations: {
        colors: ['primary', 'card', 'background'],
        lighten: 10,
        darken: 10,
      },
      themes: {
        dark: {
          colors: {
            primary: '#8f00ff',
            card: '#212121',
            text: '#ffffff',
            highlight: '#555',
          },
        },
        light: {
          colors: {
            primary: '#8f00ff',
            card: '#fcfcfb',
            text: '#000000',
            highlight: '#ccc',
          },
        },
      },
    },
    defaults: {
      VCheckbox: {
        style: 'font-weight: 600;',
      },
      VCard: {
        rounded: 'xl',
      },
      VTextField: {
        variant: 'solo-filled',
        rounded: 'lg',
        elevation: 1,
      },
      VTextarea: {
        variant: 'solo-filled',
        rounded: 'lg',
        elevation: 1,
      },
      VFileInput: {
        variant: 'solo-filled',
        rounded: 'lg',
        elevation: 1,
        chips: true,
      },
      VSelect: {
        variant: 'solo-filled',
        rounded: 'lg',
        elevation: 1,
      },
      VAutocomplete: {
        variant: 'solo-filled',
        rounded: 'lg',
        elevation: 1,
      },
      VBtn: {
      },
      VList: {
        rounded: 'lg',
      },
    },

  })

  nuxtApp.vueApp.use(vuetify)
})
