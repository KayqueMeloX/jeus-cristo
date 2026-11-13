import { describe, it, expect } from "vitest";
import { supportMessageSchema } from "./support-schema";

describe("supportMessageSchema", () => {
  it("rejects a message without an email", () => {
    expect(supportMessageSchema.safeParse({ email: "", message: "help" }).success).toBe(false);
  });
  it("rejects an invalid email", () => {
    expect(supportMessageSchema.safeParse({ email: "john", message: "help" }).success).toBe(false);
  });
  it("accepts a message with a valid email", () => {
    expect(supportMessageSchema.safeParse({ email: "a@b.com", message: "help" }).success).toBe(true);
  });
});
