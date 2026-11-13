import { describe, it, expect } from "vitest";
import { prayerCountForAmount } from "./prayer-tiers";

describe("prayerCountForAmount", () => {
  it("$27 plan (or ~25 EUR) gets 20 prayers", () => {
    expect(prayerCountForAmount(27)).toBe(20);
    expect(prayerCountForAmount(25)).toBe(20);
  });
  it("$47 plan gets 40 prayers", () => expect(prayerCountForAmount(47)).toBe(40));
  it("$77 plan gets 60 prayers", () => expect(prayerCountForAmount(77)).toBe(60));
  it("$100 plan (or ~90 EUR) gets 80 prayers", () => {
    expect(prayerCountForAmount(100)).toBe(80);
    expect(prayerCountForAmount(90)).toBe(80);
  });
});
