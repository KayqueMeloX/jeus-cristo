/**
 * Meta Conversions API (CAPI) Integration
 * Pixel ID: 29015918781408333
 */

export interface MetaConversionUserData {
  email?: string;
  phone?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string;
  fbp?: string;
}

export interface SendMetaConversionParams {
  eventName: string;
  eventSourceUrl?: string;
  userData?: MetaConversionUserData;
  customData?: Record<string, unknown>;
  eventId?: string;
}

async function sha256(v: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sendMetaConversionEvent({
  eventName,
  eventSourceUrl,
  userData,
  customData,
  eventId,
}: SendMetaConversionParams) {
  // Read managed credentials only during server execution; never bundle a private fallback.
  const pixelId = process.env["META_PIXEL_ID"] || "29015918781408333";
  const accessToken = process.env["META_ACCESS_TOKEN"] || process.env["META_ADS_API_KEY"];
  if (!accessToken) {
    console.error("Meta CAPI credential is not configured");
    return null;
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: currentTimestamp,
        action_source: "website",
        event_source_url: eventSourceUrl,
        event_id: eventId,
        user_data: {
          em: userData?.email ? [await sha256(userData.email.trim().toLowerCase())] : undefined,
          client_ip_address: userData?.clientIpAddress,
          client_user_agent: userData?.clientUserAgent,
          fbc: userData?.fbc,
          fbp: userData?.fbp,
        },
        custom_data: customData,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Meta CAPI dispatch error:", error);
    return null;
  }
}
