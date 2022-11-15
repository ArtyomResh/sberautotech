import i18n from 'i18next';
import { ru } from './locales/ru';
import { en } from './locales/en';

export type TLocale = 'en' | 'ru';

const defaultLocale: TLocale = 'ru';

export const defaultNS = 'common';

export type TLanguageResource = typeof ru;

export type TLanguageResources = {[key in TLocale]: TLanguageResource};

export const locales: TLanguageResources = {
    ru: ru,
    en: en
};


const availableLocales = Object.keys(locales);

const getLocale = (): TLocale => {
    const envLocale = process.env.GATSBY_LOCALE_CODE as TLocale | undefined;

    return envLocale && availableLocales.includes(envLocale) ? envLocale : defaultLocale;
};

void i18n
    .init({
        fallbackLng: defaultLocale,
        ns         : [defaultNS],
        resources  : locales,
        defaultNS  : defaultNS,
        lng        : getLocale()
    });


export const translate = i18n.t;

