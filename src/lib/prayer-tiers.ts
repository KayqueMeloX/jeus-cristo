/** Maps a paid amount (major currency units, USD or EUR) to the number of prayers delivered. */
export type PrayerCount = 20 | 40 | 60 | 80;

export function prayerCountForAmount(amount: number): PrayerCount {
  if (!Number.isFinite(amount) || amount < 35) return 20; // $27 plan
  if (amount < 60) return 40; // $47 plan
  if (amount < 85) return 60; // $77 plan
  return 80; // $100 plan
}

export function pdfFileFor(count: PrayerCount): string {
  return `The-${count}-Sacred-Prayers-Archangel-Michael.pdf`;
}

/** Verifies a Stripe-Signature header (v1 HMAC-SHA256 of `${t}.${body}`) using Web Crypto. */
export async function verifyStripeSignature(
  body: string,
  header: string | null,
  secret: string,
  toleranceSec = 300,
): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }),
  ) as Record<string, string>;
  const t = parts["t"];
  const sigs = header
    .split(",")
    .filter((p) => p.trim().startsWith("v1="))
    .map((p) => p.trim().slice(3));
  if (!t || sigs.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${body}`));
  const expected = Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((s) => s.length === expected.length && timingSafe(s, expected));
}

function timingSafe(a: string, b: string): boolean {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
