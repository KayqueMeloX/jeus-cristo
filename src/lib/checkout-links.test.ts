import { describe, expect, it } from "vitest";
import { checkoutLink } from "./checkout-links";

describe("Mundpay checkout mapping", () => {
  it("routes the $27 tier to its supplied checkout", () => {
    expect(checkoutLink("27")).toBe("https://checkout.mundpay.com/01a20f28-5c62-7096-b0dc-ad271dfb3b93");
  });
  it("routes the $47 tier to its supplied checkout", () => {
    expect(checkoutLink("47")).toBe("https://checkout.mundpay.com/01a213d2-be00-736c-aab1-b861e17e4ea9");
  });
  it("routes the $77 tier to its supplied checkout", () => {
    expect(checkoutLink("77")).toBe("https://checkout.mundpay.com/01a213da-ea60-7399-a43b-6999815c8937");
  });
  it("routes the $100 tier to its supplied checkout", () => {
    expect(checkoutLink("100")).toBe("https://checkout.mundpay.com/01a213df-e59f-71ec-b914-859eeb17cb34");
  });
  it("routes the $97 upsell to the activation checkout", () => {
    expect(checkoutLink("activation")).toBe("https://checkout.mundpay.com/01a213ef-53cf-717b-9f77-c552791d6456");
  });
  it("routes the $47 wheel downsell to its distinct checkout", () => {
    expect(checkoutLink("activationDiscount")).toBe("https://checkout.mundpay.com/01a213fa-643b-73f7-a5f4-63c80913b32f");
  });
  it("routes the $47 Holy Seals upsell to its supplied checkout", () => {
    expect(checkoutLink("protection")).toBe("https://checkout.mundpay.com/01a21917-8712-73dc-af0f-ed41e90f0dda");
  });
});