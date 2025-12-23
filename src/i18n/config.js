import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import zhTranslations from './locales/zh.json';
import jaTranslations from './locales/ja.json';
import ptTranslations from './locales/pt.json';
import itTranslations from './locales/it.json';
import ruTranslations from './locales/ru.json';
import koTranslations from './locales/ko.json';

// Map country codes to language codes
// const countryToLanguage = {
//   'US': 'en',
//   'GB': 'en',
//   'CA': 'en',
//   'AU': 'en',
//   'NZ': 'en',
//   'ES': 'es',
//   'MX': 'es',
//   'AR': 'es',
//   'CO': 'es',
//   'CL': 'es',
//   'PE': 'es',
//   'VE': 'es',
//   'EC': 'es',
//   'GT': 'es',
//   'CU': 'es',
//   'DO': 'es',
//   'HN': 'es',
//   'PY': 'es',
//   'SV': 'es',
//   'NI': 'es',
//   'CR': 'es',
//   'PA': 'es',
//   'UY': 'es',
//   'BO': 'es',
//   'FR': 'fr',
//   'BE': 'fr',
//   'CH': 'fr',
//   'LU': 'fr',
//   'MC': 'fr',
//   'DE': 'de',
//   'AT': 'de',
//   'LI': 'de',
//   'CN': 'zh',
//   'TW': 'zh',
//   'HK': 'zh',
//   'SG': 'zh',
//   'JP': 'ja',
//   'PT': 'pt',
//   'BR': 'pt',
//   'AO': 'pt',
//   'MZ': 'pt',
//   'IT': 'it',
//   'SM': 'it',
//   'VA': 'it',
//   'RU': 'ru',
//   'BY': 'ru',
//   'KZ': 'ru',
//   'KR': 'ko',
//   'KP': 'ko',
// };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations },
      zh: { translation: zhTranslations },
      ja: { translation: jaTranslations },
      pt: { translation: ptTranslations },
      it: { translation: itTranslations },
      ru: { translation: ruTranslations },
      ko: { translation: koTranslations },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      // Check browser language and map to supported languages
      checkWhitelist: true,
    },
    supportedLngs: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'pt', 'it', 'ru', 'ko'],
  });

export default i18n;

