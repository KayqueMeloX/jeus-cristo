/**
 * Builds the Stripe `client_reference_id` in the exact format UTMify reads
 * from Stripe webhooks: source__medium__campaign__content__term.
 * Stripe Payment Links drop normal utm_* params, so this is the only way
 * UTMify can tell which creative produced a sale.
 */
const UTM_ORDER = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function clean(value: string | null | undefined): string {
  if (!value) return "";
  const head = value.split("::")[0] ?? "";
  const last = head.includes("|") ? head.substring(head.lastIndexOf("|") + 1) : head;
  return last.replace(/[^A-Za-z0-9_-]/g, "");
}

export function buildClientReferenceId(get: (key: string) => string | null | undefined): string | null {
  const parts = UTM_ORDER.map((k) => clean(get(k)));
  if (parts.every((p) => !p)) return null;
  return parts.join("__").slice(0, 200);
}

/** Reads UTMs from the current URL first, then from the saved landing params. */
export function readTrackingGetter(params: URLSearchParams): (key: string) => string | null {
  let saved: Record<string, string> = {};
  try {
    saved = JSON.parse(localStorage.getItem("pf_tracking") || "{}") as Record<string, string>;
  } catch {
    saved = {};
  }
  return (k) => params.get(k) || saved[k] || null;
}
