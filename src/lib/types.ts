import { locales } from "@/middleware";

export type Order = {
  id: number;
  phone: number;
  customerName: string;
  customerId?: number;
  thobeNumber: number;
};

type Locale = (typeof locales)[number];

const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
  he: "rtl",
};

// Helper function
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return localeDirection[locale] ?? "rtl"; // fallback if needed
}
