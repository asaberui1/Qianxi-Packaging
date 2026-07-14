import en from './en';
import zh from './zh';
import type { SiteTranslations } from './types';

export const locales = {
  en: { label: 'English', key: 'en', translations: en },
  zh: { label: '中文', key: 'zh', translations: zh },
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/zh')) return 'zh';
  return 'en';
}

export function getTranslations(locale: Locale): SiteTranslations {
  return locales[locale].translations;
}

export function detectBrowserLanguage(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;
  const lang = navigator.language || (navigator as any).userLanguage || '';
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(zh|en)\//, '/').replace(/^\/zh$/, '/');
  if (locale === 'en') {
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  return `/zh${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

export type { SiteTranslations };
