/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Whop webhook helpers (Standard Webhooks spec).
 * Signed content = `${webhook-id}.${webhook-timestamp}.${body}`, HMAC-SHA256,
 * header `webhook-signature` = space-separated "v1,<base64>" entries.
 */
function b64(bytes: ArrayBuffer): string {
  let s = "";
  const u = new Uint8Array(bytes);
  for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]!);
  return btoa(s);
}

function candidateKeys(secret: string): Uint8Array[] {
  const enc = new TextEncoder();
  const keys: Uint8Array[] = [enc.encode(secret)];
  const raw = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  try {
    const bin = atob(raw);
    keys.push(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    /* not base64 */
  }
  return keys;
}

export async function verifyWhopSignature(
  body: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  secret: string,
): Promise<boolean> {
  const { id, timestamp, signature } = headers;
  if (!id || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 600) return false;
  const provided = signature.split(" ").map((p) => p.split(",")[1]).filter(Boolean);
  const content = new TextEncoder().encode(`${id}.${timestamp}.${body}`);
  for (const key of candidateKeys(secret)) {
    const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const expected = b64(await crypto.subtle.sign("HMAC", k, content));
    if (provided.some((p) => p === expected)) return true;
  }
  return false;
}

export interface WhopPayment {
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  amount: number;
  currency: string;
}

/** Reads both current (`type`, `data.total`, `data.user.email`) and legacy (`action`, `final_amount`) shapes. */
export function parseWhopPayment(payload: unknown): { event: string; payment: WhopPayment } {
  const p = (payload ?? {}) as any;
  const event = String(p.type ?? p.action ?? "");
  const d = (p.data ?? {}) as any;
  const rawAmount = d.total ?? d.usd_total ?? d.subtotal ?? d.final_amount ?? d.amount ?? 0;
  let amount = Number(rawAmount) || 0;
  if (d.final_amount !== undefined && d.total === undefined && amount > 500) amount = amount / 100;
  const email = d.user?.email ?? d.user_email ?? d.email ?? d.member?.email ?? d.billing_address?.email;
  const name = d.user?.name ?? d.user?.username ?? d.billing_address?.name;
  return {
    event,
    payment: {
      id: d.id,
      email: typeof email === "string" ? email : undefined,
      name: typeof name === "string" ? name : undefined,
      amount,
      currency: String(d.currency ?? "usd").toUpperCase(),
    },
  };
}
