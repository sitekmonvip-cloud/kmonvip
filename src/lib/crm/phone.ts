/** Digits only, with the Brazilian country code (55) stripped when present. */
function nationalDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    return digits.slice(2);
  }
  return digits;
}

/** "5521984456657" / "55(21)98445-6657" -> "(21) 98445-6657". Unknown shapes are returned as typed. */
export function formatPhone(phone: string): string {
  const national = nationalDigits(phone);
  if (national.length === 11) {
    return `(${national.slice(0, 2)}) ${national.slice(2, 7)}-${national.slice(7)}`;
  }
  if (national.length === 10) {
    return `(${national.slice(0, 2)}) ${national.slice(2, 6)}-${national.slice(6)}`;
  }
  return phone.trim();
}

/** wa.me link for the lead's number, assuming Brazil (+55) when no country code was stored. */
export function whatsappLink(phone: string): string | null {
  const national = nationalDigits(phone);
  if (national.length === 10 || national.length === 11) {
    return `https://wa.me/55${national}`;
  }
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 ? `https://wa.me/${digits}` : null;
}

/**
 * Normalizes what a person typed into digits only, assuming Brazil (+55) when no country code is
 * present. Returns null when it can't be a phone number. "(21) 98445-6657" -> "5521984456657".
 */
export function normalizePhoneInput(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) return digits;
  // Other countries: accept a plausible international length as typed.
  if (digits.length >= 12 && digits.length <= 15) return digits;
  return null;
}
