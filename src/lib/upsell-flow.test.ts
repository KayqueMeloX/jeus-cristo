import { describe, expect, it } from "vitest";
import { upsellForWhopPayment, tierForWhopPayment } from "./whop-webhook";
import { upsellCheckoutUrl } from "./upsell-flow";

describe("upsells", () => {
  it("a $47 upsell payment is not treated as the 40-prayer tier", () => {
    const d = { plan_id: "plan_F8gGYIH1LDTbM", subtotal: 47 };
    expect(upsellForWhopPayment(d)).toBe("protection");
    expect(tierForWhopPayment(d)).toBeUndefined();
  });
  it("a front $47 payment still gets 40 prayers", () => {
    expect(tierForWhopPayment({ checkout_configuration_id: "ch_vqS1bj7iXF2KYmr" })).toBe(40);
  });
  it("upsell checkout keeps UTMs and drops purchase params", () => {
    expect(upsellCheckoutUrl("journey", "?paid=true&amt=27&utm_source=FB")).toBe("/checkout?plan=journey&utm_source=FB");
  });
});
