import { LocalizationMap } from './LocalizationMap';

export const localeMap = [
  new LocalizationMap('English', 'en'),
  new LocalizationMap('Pirate', 'arr'),
];

export const supportedLanguages = localeMap.map((l) => l.name);
export const supportedLanguagesCodes = localeMap.map((l) => l.code);