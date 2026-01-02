import { atom } from "jotai";
export const neckInfoAtom = atom<string[]>([]);
export const wristInfoAtom = atom<string[]>([]);
export const activeOrderCustomerIdAtom = atom<number | null>(null);
