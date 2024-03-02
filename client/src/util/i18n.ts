/**
 * @fileOverview This file configures i18next for proper use in the program.
 * */

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend, {HttpBackendOptions} from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * A key-value object containing the languages supported by this website. The key
 * is the language code, while the value is the localized name of the language.
 * */
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
      loadPath: `${process.env.REACT_APP_SERVER_URL}/locales/{{lng}}/{{ns}}.json`,
    },
  });

let alertDisplayed = false;

/**
 * Alerts the user that the server cannot be reached for downloading translations, and reloads the page.
 * */
i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed to load translations for ${lng}: ${msg}`);

  if (!alertDisplayed) {
    let alertMessage: string;
    switch (i18n.language) {
      case 'sv':
        alertMessage =
          'Hoppsan! Något gick fel.\n\n' +
          'Vi kunde inte ladda översättningarna för appen från servern. Det verkar som om servern är nere eller har problem.\n\n' +
          'Du kan försöka igen genom att ladda om sidan eller helt enkelt stänga det här meddelandet och försöka igen senare.\n\n' +
          'Vi ber om ursäkt för eventuella olägenheter.';
        break;
      case 'en':
        alertMessage =
          'Oops! Something went wrong.\n\n' +
          "We couldn't load the translations for the app from the server. It looks like the server might be down or experiencing issues.\n\n" +
          'You can try again by reloading the page or simply close this message and give it another shot later.\n\n' +
          'We apologize for any inconvenience.';
        break;
      default:
        alertMessage =
          'Oops! Something went wrong.\n\n' +
          "We couldn't load the translations for the app from the server. It looks like the server might be down or experiencing issues.\n\n" +
          'You can try again by reloading the page or simply close this message and give it another shot later.\n\n' +
          'We apologize for any inconvenience.';
    }

    window.alert(alertMessage);
    alertDisplayed = true;
  }
  window.location.reload();
});

export default i18n;
