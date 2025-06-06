import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)          // liest navigator‑Sprache & localStorage
  .use(initReactI18next)          // bindet an React
  .init({
    resources: { de: { translation: de }, en: { translation: en } },
    fallbackLng: 'en',
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    interpolation: { escapeValue: false }   // React schützt XSS bereits
  });

export default i18n;
