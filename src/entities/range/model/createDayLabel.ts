import type { Locale } from "shared/model";
import { locale } from "shared/lib";

const CASES = [2, 0, 1, 1, 1, 2] as const;

const getTitles = (lang: Locale) =>
  [locale[lang].day1, locale[lang].day2, locale[lang].day3] as const;

export const createDayLabel = (n: number, lang: Locale): string => {
  const titles = getTitles(lang);
  const idx = n % 100 > 4 && n % 100 < 20 ? 2 : CASES[n % 10 < 5 ? n % 10 : 5];
  return `${n} ${titles[idx]}`;
};
