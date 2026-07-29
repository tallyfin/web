import { en, type Messages } from "./en.ts";

export type Locale = "en";

const catalogs: Record<Locale, Messages> = { en };

export function messagesFor(locale: string): Messages {
  return catalogs[locale as Locale] ?? en;
}
