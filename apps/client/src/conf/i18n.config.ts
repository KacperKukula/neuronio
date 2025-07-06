import { createI18n } from 'vue-i18n'

import pl from "@/locales/pl.json" 
import en from "@/locales/en.json" 

export const i18n = createI18n<{ [key: string]: any }>({ 
  locale: "en-US",
  fallbackLocale: "en-US", 
  messages: { "en-US": en, "pl-PL": pl }, 
  legacy: false 
})