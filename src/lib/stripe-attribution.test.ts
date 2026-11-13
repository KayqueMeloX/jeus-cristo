import { describe, expect, it } from "vitest";
import { buildClientReferenceId } from "./stripe-attribution";

describe("buildClientReferenceId", () => {
  it("joins the 5 UTMs with __ in UTMify order", () => {
    const p = new URLSearchParams("utm_source=FB&utm_medium=CONJUNTO|123&utm_campaign=JESUS|456&utm_content=AD 7|789&utm_term=ig");
    expect(buildClientReferenceId((k) => p.get(k))).toBe("FB__123__456__789__ig");
  });
  it("returns null when there are no UTMs", () => {
    expect(buildClientReferenceId(() => null)).toBeNull();
  });
});
