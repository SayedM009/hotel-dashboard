import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locale/en.json";
import ar from "./locale/ar.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true, // شيله في الإنتاج

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
  });

export default i18n;
