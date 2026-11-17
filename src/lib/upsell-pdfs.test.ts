import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { UPSELL_PDFS } from "./whop-webhook";

describe("upsell deliverables", () => {
  it("90-day plan (full and discounted) ships the activation PDF", () => {
    expect(UPSELL_PDFS.activation).toBe("90-Day-Faith-Activation-Plan.pdf");
    expect(UPSELL_PDFS.activationDiscount).toBe(UPSELL_PDFS.activation);
  });
  it("every upsell PDF exists on the site", () => {
    for (const f of Object.values(UPSELL_PDFS)) expect(existsSync(`public/media/ebooks/${f}`)).toBe(true);
  });
});
