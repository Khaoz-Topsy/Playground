import i18next from 'i18next';

import { LocaleKey } from '../localization/LocaleKey';
import { log, logToConsoleEnabled, warn } from '../integration/logging';

const loadLocaleMessages = (): any => {
  const locales = require.context('../assets/lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: any = {};
  locales.keys().forEach(key => {
    const matched = key.match(/language.([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      // const locale = matched[1];
      const locale = matched[1].replace('-', '');
      let i18nextTranslationObject: any = { translation: {} };
      const currentLocaleObj = locales(key);
      for (var localeKey in currentLocaleObj) {
        i18nextTranslationObject.translation[localeKey] = currentLocaleObj[localeKey];
      }
      messages[locale] = i18nextTranslationObject;
    }
  });

  log(messages);
  return messages;
}

export const supportedLangs = [
  {
    name: 'English',
    value: 'en'
  },
  {
    name: 'Lol',
    value: 'lol'
  }
]

export const initLocalization = (currentLanguage: string) => {
  i18next.init({
    lng: currentLanguage,
    fallbackLng: 'en',
    debug: logToConsoleEnabled(),

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: loadLocaleMessages()
  }, () => { (window as any).i18nextIsSetup = true });
}

export const changeLocalization = (newLanguage: string) => {
  i18next.changeLanguage(newLanguage);
}

export const translate = (key: LocaleKey) => {
  if (typeof (key) === 'string') return key;

  const transKey = LocaleKey?.[key]?.toString?.() ?? LocaleKey.unknown;
  const trans = i18next.t(transKey);
  if (trans) return trans;
  // return '.' + trans;

  if ((window as any).i18nextIsSetup === true) warn(`key not found: ${transKey.toString()}`);

  return transKey.toString();
  // return '++' + i18next.t(key.toString());
}