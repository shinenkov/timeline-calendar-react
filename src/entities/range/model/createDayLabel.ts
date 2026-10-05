import type { Locale } from "shared/model";
import { locale } from "shared/lib";

/**
 * Склоняет слово "день/дня/дней"
 */
export const createDayLabel = (n: number, lang: Locale): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = [locale[lang].day1, locale[lang].day2, locale[lang].day3];
  return `${n} ${
    titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]]
  }`;
};
