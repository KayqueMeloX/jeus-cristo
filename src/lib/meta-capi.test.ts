import { afterEach, describe, expect, it, vi } from "vitest";
import { sendMetaConversionEvent } from "./meta-capi";

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("Meta CAPI credential handling", () => {
  it("does not use an embedded credential when no server credential is available", async () => {
    vi.stubEnv("META_ACCESS_TOKEN", "");
    vi.stubEnv("META_ADS_API_KEY", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    expect(await sendMetaConversionEvent({ eventName: "Purchase" })).toBeNull();
    expect(send).not.toHaveBeenCalled();
  });
  it("uses the managed Meta credential at call time", async () => {
    vi.stubEnv("META_ACCESS_TOKEN", "");
    vi.stubEnv("META_ADS_API_KEY", "test-only-managed-meta");
    vi.stubEnv("META_PIXEL_ID", "12345");
    const send = vi.fn().mockResolvedValue(new Response('{"events_received":1}'));
    vi.stubGlobal("fetch", send);
    expect(await sendMetaConversionEvent({ eventName: "Purchase" })).toEqual({ events_received: 1 });
    expect(send).toHaveBeenCalledWith(
      "https://graph.facebook.com/v19.0/12345/events?access_token=test-only-managed-meta",
      expect.objectContaining({ method: "POST" }),
    );
  });
});