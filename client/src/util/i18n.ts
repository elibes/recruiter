import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend, {HttpBackendOptions} from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const supportedLngs = {
  en: 'English',
  sv: 'Svenska',
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: 'en',
    supportedLngs: Object.keys(supportedLngs),
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath:
        '' + process.env.REACT_APP_SERVER_URL + '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
