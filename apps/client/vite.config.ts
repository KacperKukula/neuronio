import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

import Components from 'unplugin-vue-components/vite';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    /**
     * Assistant for importing components for priumevue
     * @enables importing PrimeVue components with auto-import
     */
    Components({
      resolvers: [
        PrimeVueResolver()
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/scss/_variables.scss' as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: "https://localhost:5173",
})