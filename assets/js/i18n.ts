import { nextTick } from "vue";
import { createI18n, type VueI18nInstance } from "vue-i18n";
import en from "../../i18n/en.json";
import { i18n as i18nApi } from "./api";
import settings from "./settings";

// https://github.com/joker-x/languages.js/blob/master/languages.json
export const LOCALES = {
  ar: ["Arabic", "العربية"],
  bg: ["Bulgarian", "Български"],
  ca: ["Catalan", "Català"],
  cs: ["Czech", "Česky"],
  da: ["Danish", "Dansk"],
  de: ["German", "Deutsch"],
  el: ["Greek", "Ελληνικά"],
  en: ["English", "English"],
  es: ["Spanish", "Español"],
  et: ["Estonian", "Eesti"],
  fi: ["Finnish", "Suomi"],
  fr: ["French", "Français"],
  hr: ["Croatian", "Hrvatski"],
  hu: ["Hungarian", "Magyar"],
  it: ["Italian", "Italiano"],
  lb: ["Luxembourgish", "Lëtzebuergesch"],
  lt: ["Lithuanian", "Lietuvių"],
  nl: ["Dutch", "Nederlands"],
  no: ["Norwegian", "Norsk"],
  pl: ["Polish", "Polski"],
  pt: ["Portuguese", "Português"],
  ro: ["Romanian", "Română"],
  ru: ["Russian", "Русский"],
  sk: ["Slovak", "Slovenčina"],
  sl: ["Slovenian", "Slovenščina"],
  sv: ["Swedish", "Svenska"],
  ta: ["Tamil", "தமிழ்"],
  tr: ["Turkish", "Türkçe"],
  uk: ["Ukrainian", "Українська"],
  "zh-Hans": ["Chinese (Simplified)", "简体中文"],
};

export const DEFAULT_LOCALE = "en";
const htmlLang = document.querySelector("html")?.getAttribute("lang");
const DEFAULT_BROWSER_LOCALE = htmlLang?.length == 2 ? htmlLang : DEFAULT_LOCALE;

export function getLocalePreference() {
  return settings.locale;
}

export function removeLocalePreference(i18n: VueI18nInstance) {
  settings.locale = null;
  setI18nLanguage(i18n, DEFAULT_BROWSER_LOCALE as keyof typeof LOCALES);
  ensureCurrentLocaleMessages(i18n);
}

export function setLocalePreference(i18n: VueI18nInstance, locale: keyof typeof LOCALES) {
  if (!(locale in LOCALES)) {
    console.error("unknown locale", locale);
    return;
  }
  settings.locale = locale;
  setI18nLanguage(i18n, locale);
  ensureCurrentLocaleMessages(i18n);
}

function getLocale() {
  return getLocalePreference() || DEFAULT_BROWSER_LOCALE;
}

export default function setupI18n() {
  const i18n = createI18n({
    legacy: true,
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: { en },
  });
  setI18nLanguage(i18n.global, getLocale());
  return i18n;
}

export function setI18nLanguage(i18n: VueI18nInstance, locale: typeof i18n.locale) {
  i18n.locale = locale;
  document.querySelector("html")?.setAttribute("lang", locale);
}

async function loadLocaleMessages(i18n: VueI18nInstance, locale: typeof i18n.locale) {
  try {
    const response = await i18nApi.get(`${locale}.json`, {
      params: { v: window.evcc?.version },
    });
    if ("setLocaleMessage" in i18n) {
      i18n.setLocaleMessage(locale, response.data);
    }
  } catch (e) {
    console.error(`unable to load translation for [${locale}]`, e);
  }

  return nextTick();
}

export async function ensureCurrentLocaleMessages(i18n: VueI18nInstance) {
  const { locale } = i18n;
  if (!i18n.availableLocales.includes(locale)) {
    await loadLocaleMessages(i18n, locale);
  }
}

export function docsPrefix() {
  const locale = getLocale();
  const path = locale === "de" ? "" : `/en`;
  return `https://docs.evcc.io${path}`;
}
