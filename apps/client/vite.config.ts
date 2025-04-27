import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import Components from 'unplugin-vue-components/vite';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    
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
      '@modules': resolve(__dirname, 'src/modules'),
    },
  },
  base: "https://localhost:5173",
})