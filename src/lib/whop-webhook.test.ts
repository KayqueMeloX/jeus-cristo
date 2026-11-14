import { describe, it, expect } from "vitest";
import { parseWhopPayment, verifyWhopSignature } from "./whop-webhook";

async function sign(secret: string, id: string, ts: string, body: string) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(`${id}.${ts}.${body}`)));
  return "v1," + btoa(String.fromCharCode(...sig));
}

describe("whop webhook", () => {
  it("accepts a valid signature and rejects a tampered body", async () => {
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = await sign("ws_test", "msg_1", ts, "{}");
    expect(await verifyWhopSignature("{}", { id: "msg_1", timestamp: ts, signature: sig }, "ws_test")).toBe(true);
    expect(await verifyWhopSignature("{\"x\":1}", { id: "msg_1", timestamp: ts, signature: sig }, "ws_test")).toBe(false);
  });
  it("reads the $100 plan email and amount", () => {
    const r = parseWhopPayment({ type: "payment.succeeded", data: { id: "pay_1", total: 100, currency: "usd", user: { email: "a@b.com" } } });
    expect(r.event).toBe("payment.succeeded");
    expect(r.payment.amount).toBe(100);
    expect(r.payment.email).toBe("a@b.com");
  });
});
