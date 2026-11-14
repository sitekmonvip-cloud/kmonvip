// Protocol code that ties an anonymous WhatsApp click on the site to the inbound message
// the visitor later sends. The code travels in the pre-filled message ("Protocolo: K7M2"); when
// the WhatsApp Business webhook reports that message, the CRM matches the code back to the click.

// No 0/O/1/I/L — codes get read aloud and retyped.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const REF_LENGTH = 5;
const LABEL = "Protocolo";
// "Ref" is still accepted so messages sent before the label changed keep matching.
const REF_PATTERN = /(?:Protocolo|Ref):\s*([A-Z0-9]{5})\b/i;
const TRAILING_REF = /\s*(?:Protocolo|Ref):\s*[A-Z0-9]{5}\s*$/i;
const DEFAULT_MESSAGE = "Olá! Vim através do site e gostaria de fazer uma cotação.";

export function generateRef(): string {
  const bytes = new Uint8Array(REF_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** Pulls the "Protocolo: XXXXX" code out of an inbound message body, upper-cased. */
export function extractRef(text: string | null | undefined): string | null {
  const match = text ? REF_PATTERN.exec(text) : null;
  return match ? match[1].toUpperCase() : null;
}

/** Returns the wa.me URL with a fresh "Protocolo: XXXXX" line appended to the pre-filled message. */
export function withRef(href: string, ref: string): string {
  const url = new URL(href);
  const current = url.searchParams.get("text") ?? DEFAULT_MESSAGE;
  const base = current.replace(TRAILING_REF, "").trim() || DEFAULT_MESSAGE;
  url.searchParams.set("text", `${base}\n\n${LABEL}: ${ref}`);
  return url.toString();
}
