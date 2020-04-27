import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const appLocales = ['en', 'ja', 'nl']

i18n.use(Backend)
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: 'en',
        fallbackLng: 'en',
        whitelist: appLocales,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    })

export default i18n
