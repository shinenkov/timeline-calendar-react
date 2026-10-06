import type { Locale } from "shared/model";
import { locale } from "shared/lib";

const RU_CASES = [2, 0, 1, 1, 1, 2] as const;

export const createDayLabel = (n: number, lang: Locale): string => {
  if (lang === "en") {
    return `${n} ${n === 1 ? locale.en.day1 : locale.en.day3}`;
  }

  const titles = [locale.ru.day1, locale.ru.day2, locale.ru.day3];
  const idx =
    n % 100 > 4 && n % 100 < 20 ? 2 : RU_CASES[n % 10 < 5 ? n % 10 : 5];
  return `${n} ${titles[idx]}`;
};
