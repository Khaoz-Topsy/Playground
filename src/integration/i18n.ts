import i18next from 'i18next';
import { LocaleKey } from '../localization/LocaleKey';

export const initLocalization = (currentLanguage: string) => {
  i18next.init({
    lng: currentLanguage,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: loadLocaleMessages()
  });
}


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

  console.log(messages);
  return messages;
}

export const translate = (key: LocaleKey) => {
  //debugger;
  const trans = i18next.t(LocaleKey[key].toString());
  if (trans) return trans;
  return key.toString();
  // return '.' + i18next.t(key.toString());
}