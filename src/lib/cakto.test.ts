import { describe, it, expect } from "vitest";
import { parseCaktoWebhook, safeEqual } from "./cakto";

describe("cakto", () => {
  it("maps the $97 offer to the 90-day plan", () => {
    const s = parseCaktoWebhook({ event: "purchase_approved", data: { id: "o1", amount: 97, offer: { id: "34vceic" }, customer: { email: "A@B.com" } } });
    expect(s.product).toEqual({ kind: "upsell", key: "activation" });
    expect(s.email).toBe("a@b.com");
  });
  it("maps the $27 offer to 20 prayers", () => {
    expect(parseCaktoWebhook({ data: { offer: { id: "6dzpif7" } } }).product).toEqual({ kind: "tier", count: 20 });
  });
  it("rejects wrong secret", () => { expect(safeEqual("abc", "abd")).toBe(false); expect(safeEqual("", "")).toBe(false); });
});
