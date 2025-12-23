import { useTranslation } from 'react-i18next';
import cointegratedPairsEn from './cointegratedPairs.en.json';
import cointegratedPairsEs from './cointegratedPairs.es.json';
import cointegratedPairsFr from './cointegratedPairs.fr.json';
import cointegratedPairsDe from './cointegratedPairs.de.json';
import cointegratedPairsZh from './cointegratedPairs.zh.json';
import cointegratedPairsJa from './cointegratedPairs.ja.json';
import cointegratedPairsPt from './cointegratedPairs.pt.json';
import cointegratedPairsIt from './cointegratedPairs.it.json';
import cointegratedPairsRu from './cointegratedPairs.ru.json';
import cointegratedPairsKo from './cointegratedPairs.ko.json';
import fluxPivotEn from './fluxPivot.en.json';
import fluxPivotEs from './fluxPivot.es.json';
import fluxPivotFr from './fluxPivot.fr.json';
import fluxPivotDe from './fluxPivot.de.json';
import fluxPivotZh from './fluxPivot.zh.json';
import fluxPivotJa from './fluxPivot.ja.json';
import fluxPivotPt from './fluxPivot.pt.json';
import fluxPivotIt from './fluxPivot.it.json';
import fluxPivotRu from './fluxPivot.ru.json';
import fluxPivotKo from './fluxPivot.ko.json';

const blogTranslations = {
  cointegratedPairs: {
    en: cointegratedPairsEn,
    es: cointegratedPairsEs,
    fr: cointegratedPairsFr,
    de: cointegratedPairsDe,
    zh: cointegratedPairsZh,
    ja: cointegratedPairsJa,
    pt: cointegratedPairsPt,
    it: cointegratedPairsIt,
    ru: cointegratedPairsRu,
    ko: cointegratedPairsKo,
  },
  fluxPivot: {
    en: fluxPivotEn,
    es: fluxPivotEs,
    fr: fluxPivotFr,
    de: fluxPivotDe,
    zh: fluxPivotZh,
    ja: fluxPivotJa,
    pt: fluxPivotPt,
    it: fluxPivotIt,
    ru: fluxPivotRu,
    ko: fluxPivotKo,
  },
};

export const useBlogTranslation = (postName = 'cointegratedPairs') => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const language = currentLanguage.split('-')[0]; // Handle 'en-US' -> 'en'
  
  // Get translations for the specific post
  const postTranslations = blogTranslations[postName] || blogTranslations.cointegratedPairs;
  
  // Fallback to English if language not found
  const translations = postTranslations[language] || postTranslations.en;
  
  return translations;
};

