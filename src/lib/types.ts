import { locales } from "@/middleware";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  preferences: {
    activeBranchId: number | null;
  };
};

export type Order = {
  id: number;
  phone: number;
  customerName: string;
  customerId?: number;
  thobeNumber: number;
};

export type customer = {
  id: number;
  name: string;
  phone: string;
  notes?: string;
};

export type branch = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
};

export type orderItem = {
  fabricType: string;
  color: string;
  unitPrice: number;
  measurementId: number;
  quantity: number;
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
