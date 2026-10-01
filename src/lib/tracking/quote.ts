// Shared (client + server) normalisation/validation for the quote form.

export const MIN_FILL_MS = 3000;

export function normalizeEmail(email: string): string {
  return email.replace(/\s+/g, "").toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizeEmail(email));
}

/** Digits of the national number, without leading zeros (BR trunk prefix "0"). */
function nationalDigits(countryCode: string, phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return countryCode === "55" ? digits.replace(/^0+/, "") : digits;
}

/** Brazil: DDD + 8/9 digits (10–11). Other countries: 6–14 digits. */
export function isValidPhone(countryCode: string, phone: string): boolean {
  const n = nationalDigits(countryCode, phone);
  if (countryCode === "55") return /^[1-9]{2}\d{8,9}$/.test(n);
  return n.length >= 6 && n.length <= 14;
}

/** E.164, e.g. +5561998630303 */
export function toE164(countryCode: string, phone: string): string {
  return `+${countryCode}${nationalDigits(countryCode, phone)}`;
}
