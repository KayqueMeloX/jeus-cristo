// Server-only Digistore24 API helper. Never import from client code.
const DS24_BASE = "https://www.digistore24.com/api/call/";

export interface Ds24Result {
  httpStatus: number;
  ok: boolean;
  code: number | null;
  message: string | null;
  data: unknown;
}

/** Calls a Digistore24 API function with X-DS-API-KEY auth; returns the original error untouched. */
export async function callDs24(fn: string, params: Record<string, string>): Promise<Ds24Result> {
  const key = process.env["DIGISTORE24_API_KEY"];
  if (!key) throw new Error("DIGISTORE24_API_KEY is not configured");
  const res = await fetch(DS24_BASE + encodeURIComponent(fn), {
    method: "POST",
    headers: { "X-DS-API-KEY": key, "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams(params).toString(),
  });
  const text = await res.text();
  let json: Record<string, unknown> = {};
  try { json = JSON.parse(text); } catch { json = { result: "error", message: "Non-JSON response" }; }
  const out: Ds24Result = {
    httpStatus: res.status,
    ok: res.ok && json["result"] === "success",
    code: typeof json["code"] === "number" ? (json["code"] as number) : null,
    message: typeof json["message"] === "string" ? (json["message"] as string) : null,
    data: json["data"] ?? null,
  };
  // Safe diagnostic log: no key, no payload values.
  console.log("[ds24]", fn, { http: out.httpStatus, ok: out.ok, code: out.code, message: out.message, fields: Object.keys(params) });
  return out;
}
