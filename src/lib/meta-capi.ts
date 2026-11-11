/**
 * Meta Conversions API (CAPI) Integration
 * Pixel ID: 29015918781408333
 */

export const META_PIXEL_ID =
  process.env["META_PIXEL_ID"] || "29015918781408333";

export const META_ACCESS_TOKEN =
  process.env["META_ACCESS_TOKEN"] ||
  "EAAMZCDQyWTsoBSZCPAnuKotWiVC5rDSZAF6qMJSSJaoQECgAiHOD6p4BFGTjxUE3DXc2hMK9FQakniX2D97a6BWZBM1OV0TlYbtfjZCclEOBRGY8GMWw3J9bSMSRxzQA66TBwa6QFAJVDohStvncw5gOz5niYQSG3Y3mRXaUM8hYx1wKLUDzhoWufZBa6ZBXQZDZD";

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

export async function sendMetaConversionEvent({
  eventName,
  eventSourceUrl,
  userData,
  customData,
  eventId,
}: SendMetaConversionParams) {
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
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
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
