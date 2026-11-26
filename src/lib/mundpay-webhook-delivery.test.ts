import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface WebhookConfig {
  server: { handlers: { POST: (context: { request: Request }) => Promise<Response> } };
}
const state = vi.hoisted(() => ({
  config: undefined as WebhookConfig | undefined,
  meta: vi.fn(),
  utmify: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (config: WebhookConfig) => { state.config = config; return config; },
}));
vi.mock("@/lib/meta-capi", () => ({ sendMetaConversionEvent: state.meta }));
vi.mock("@/lib/utmify-order", async (importOriginal) => {
  const original = await importOriginal<typeof import("./utmify-order")>();
  return { ...original, sendUtmifyOrder: state.utmify };
});
import "@/routes/api/public/mundpay-webhook";

const sharedToken = "test-only-mundpay-shared-token-00000001";
const sale = {
  id: "01a20f28-5c62-7096-b0dc-ad271dfb3b93",
  status: "paid", amount: 2700, currency: "USD",
  customer: { email: "buyer@example.test", name: "Buyer" },
  offers: [{ price: 2700, type: "principal" }],
  tracking: { utm_campaign: "test-campaign", utm_content: "test-creative" },
};
async function deliver(body: unknown, token = sharedToken): Promise<Response> {
  const handler = state.config?.server.handlers.POST;
  if (!handler) throw new Error("Webhook handler was not registered");
  return handler({ request: new Request(`https://example.test/api/public/mundpay-webhook?token=${token}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }) });
}

describe("Mundpay postback delivery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("MUNDPAY_WEBHOOK_SECRET", sharedToken);
    vi.stubEnv("MUNDPAY_API_KEY", "");
    vi.stubEnv("UTMIFY_API_TOKEN", "test-only-utmify");
    vi.stubEnv("LOVABLE_API_KEY", "test-only-gateway");
    vi.stubEnv("BREVO_API_KEY", "test-only-brevo");
    state.meta.mockResolvedValue({ events_received: 1 });
    state.utmify.mockResolvedValue({ ok: true, status: 200, body: "OK" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("OK", { status: 201 })));
  });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it("delivers a $27 sale to Meta and Brevo and UTMify with the same order id", async () => {
    expect((await deliver(sale)).status).toBe(200);
    expect(state.meta).toHaveBeenCalledOnce();
    expect(state.meta).toHaveBeenCalledWith(expect.objectContaining({
      eventName: "Purchase", eventId: sale.id, customData: { value: 27, currency: "USD" },
    }));
    expect(state.utmify).toHaveBeenCalledOnce();
    expect(state.utmify).toHaveBeenCalledWith("test-only-utmify", expect.objectContaining({
      orderId: sale.id, platform: "Mundpay", status: "paid",
      trackingParameters: expect.objectContaining({ utm_campaign: "test-campaign", utm_content: "test-creative" }),
    }));
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith("https://connector-gateway.lovable.dev/brevo/smtp/email", expect.objectContaining({
      method: "POST", body: expect.stringContaining('"email":"buyer@example.test"'),
    }));
  });
  it("does not send any conversion or email for a forged notification", async () => {
    expect((await deliver(sale, "forged" )).status).toBe(401);
    expect(state.meta).not.toHaveBeenCalled();
    expect(state.utmify).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
  it("accepts the plain Mundpay URL when no shared token is configured", async () => {
    vi.stubEnv("MUNDPAY_WEBHOOK_SECRET", "");
    expect((await deliver(sale, "")).status).toBe(200);
    expect(state.meta).toHaveBeenCalledOnce();
  });
  it("rejects malformed paid data before external delivery", async () => {
    expect((await deliver({ ...sale, customer: { email: "invalid" } })).status).toBe(400);
    expect(state.meta).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sends nothing for a refund or chargeback (UTMify gets them from Mundpay)", async () => {
    for (const status of ["refunded", "chargeback"]) {
      expect((await deliver({ ...sale, status })).status).toBe(200);
    }
    expect(state.utmify).not.toHaveBeenCalled();
    expect(state.meta).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });
});
