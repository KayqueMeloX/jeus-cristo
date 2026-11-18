/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from "@tanstack/react-router";
import { sendMetaConversionEvent } from "@/lib/meta-capi";
import { pdfFileFor, prayerCountForAmount } from "@/lib/prayer-tiers";
import { parseWhopPayment, verifyWhopSignature, UPSELL_NAMES, UPSELL_PDFS } from "@/lib/whop-webhook";
import { buildUtmifyOrder, extractUtms, fetchWhopUtms, hasAdAttribution, sendUtmifyOrder } from "@/lib/utmify-order";

const SITE = "https://godjesus.lovable.app";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function buildEmail(count: number, name: string): string {
  const pdf = `${SITE}/media/ebooks/${pdfFileFor(count as 20 | 40 | 60 | 80)}`;
  const app = `${SITE}/faith-app?paid=true`;
  return `<div style="font-family:Georgia,serif;max-width:620px;margin:0 auto;color:#222;background:#fff;border:1px solid #e8dec8;border-radius:12px;overflow:hidden">
<div style="background:#1f1707;padding:28px 20px;text-align:center;color:#f3c34e"><h1 style="margin:0;font-size:24px">Your ${count} Sacred Prayers</h1><p style="margin:6px 0 0;color:#e8dec8;font-size:14px">My Faith Sanctuary</p></div>
<div style="padding:26px 24px"><p>Hello ${escapeHtml(name)},</p>
<p>Thank you for your purchase. Your e-book with all <strong>${count} Sacred Prayers</strong> is attached and ready to download below.</p>
<p style="text-align:center;margin:26px 0"><a href="${pdf}" style="background:#e0a91d;color:#120e04;padding:15px 28px;font-weight:bold;text-decoration:none;border-radius:10px;display:inline-block">Download your ${count} Prayers (PDF)</a></p>
<p style="text-align:center"><a href="${app}" style="color:#8a6a1b;font-weight:bold">Open your Members App →</a></p>
<p style="font-size:13px;color:#666">No login or password needed — just open the app on your phone and your progress is saved automatically.</p></div></div>`;
}

export const Route = createFileRoute("/api/public/whop-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WHOP_WEBHOOK_SECRET"];
        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (!secret || !lovableKey || !brevoKey) {
          console.error("whop-webhook: missing configuration");
          return new Response("Not configured", { status: 500 });
        }
        const body = await request.text();
        const ok = await verifyWhopSignature(body, {
          id: request.headers.get("webhook-id"),
          timestamp: request.headers.get("webhook-timestamp"),
          signature: request.headers.get("webhook-signature"),
        }, secret);
        if (!ok) return new Response("Invalid signature", { status: 401 });

        let parsed: ReturnType<typeof parseWhopPayment>;
        let raw: any = {};
        try { raw = JSON.parse(body); parsed = parseWhopPayment(raw); } catch { return new Response("ignored", { status: 200 }); }
        if (parsed.event !== "payment.succeeded") return new Response("ignored", { status: 200 });
        // Webhook payloads often lack the buyer email and ad UTMs (user is only an ID).
        // Always enrich from Whop's payment API so no sale is skipped or left without its creative.
        const pid = parsed.payment.id;
        const whopKey = process.env["WHOP_API_KEY"];
        if (pid && whopKey) {
          for (let i = 0; i < 4; i++) {
            try {
              const r = await fetch(`https://api.whop.com/api/v5/company/payments/${encodeURIComponent(pid)}`, { headers: { Authorization: `Bearer ${whopKey}` } });
              if (r.ok) {
                const full = await r.json();
                raw = { ...raw, data: { ...full, ...(raw?.data ?? {}), acquisition_data: full.acquisition_data ?? raw?.data?.acquisition_data, user_email: full.user_email, billing_address: full.billing_address ?? raw?.data?.billing_address } };
                parsed = parseWhopPayment(raw);
                if (parsed.payment.email && hasAdAttribution(extractUtms(raw.data))) break;
              }
            } catch (e) { console.error("whop enrich failed", e); }
            await new Promise((res) => setTimeout(res, 2000));
          }
        }
        const { email, amount, currency, id } = parsed.payment;
        if (!email) { console.error("whop-webhook: payment without email", id); return new Response("no email", { status: 200 }); }
        const upsell = parsed.payment.upsell;
        const count = parsed.payment.tier ?? prayerCountForAmount(amount);
        const name = parsed.payment.name || "Blessed Friend";

        const capi = await sendMetaConversionEvent({
          eventName: "Purchase",
          ...(id ? { eventId: id } : {}),
          eventSourceUrl: `${SITE}/faith-app`,
          userData: { email },
          customData: { value: amount, currency },
        });
        console.log("Meta CAPI Purchase:", JSON.stringify(capi));

        const utmifyToken = process.env["UTMIFY_API_TOKEN"];
        if (utmifyToken) {
          try {
            // Webhook payloads come without the ad data; fetch it from Whop so every sale lands on its creative.
            let tracking = extractUtms(raw?.data);
            if (!hasAdAttribution(tracking)) {
              // Whop can take a few seconds to attach acquisition data; retry briefly.
              for (let i = 0; i < 3 && !hasAdAttribution(tracking); i++) {
                const t = await fetchWhopUtms(id, process.env["WHOP_API_KEY"]);
                if (hasAdAttribution(t)) tracking = { ...tracking, ...t };
                else await new Promise((r) => setTimeout(r, 2000));
              }
            }
            console.log("UTMify tracking:", JSON.stringify(tracking));
            const order = buildUtmifyOrder({
              orderId: id || `whop_${Date.now()}`, email, name, amount, prayerCount: count, ...(upsell ? { productName: UPSELL_NAMES[upsell] } : {}),
              approvedAt: new Date(), tracking,
              country: raw?.data?.billing_address?.country ?? null,
            });
            const r = await sendUtmifyOrder(utmifyToken, order);
            console.log("UTMify order:", r.status, r.body.slice(0, 200));
          } catch (e) { console.error("UTMify order failed", e); }
        }

        if (upsell) {
          // Upsells unlock inside the member app; send a confirmation instead of a prayer PDF.
          const product = UPSELL_NAMES[upsell];
          const up = await fetch(`${GATEWAY_URL}/smtp/email`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
            body: JSON.stringify({
              sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
              to: [{ email, name }],
              subject: `[Access Granted] ${product} — My Faith Sanctuary`,
              htmlContent: `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;padding:28px;background:#fffaf0;color:#2b200b"><h2 style="color:#b88812">Welcome, ${name.replace(/[<>&"]/g, "")}</h2><p>Your purchase of <b>${product}</b> is confirmed.</p><p>Your guide is attached to this email as a PDF. You can also open your Sanctuary anytime:</p><p><a href="${SITE}/faith-app?paid=true" style="background:#e0a91d;color:#120e04;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Enter My Sanctuary &rarr;</a></p></div>`,
              attachment: [{ url: `${SITE}/media/ebooks/${UPSELL_PDFS[upsell]}`, name: UPSELL_PDFS[upsell] }],
            }),
          });
          if (!up.ok) console.error(`Brevo upsell send failed [${up.status}]: ${await up.text()}`);
          return new Response("upsell", { status: 200 });
        }

        const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
          body: JSON.stringify({
            sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
            to: [{ email, name }],
            subject: `[Access Granted] Your ${count} Sacred Prayers — My Faith Sanctuary`,
            htmlContent: buildEmail(count, name),
            attachment: [{ url: `${SITE}/media/ebooks/${pdfFileFor(count)}`, name: pdfFileFor(count) }],
          }),
        });
        if (!res.ok) {
          const t = await res.text();
          console.error(`Brevo send failed [${res.status}]: ${t}`);
          return new Response(`Brevo failed [${res.status}]`, { status: 502 });
        }
        return new Response("sent", { status: 200 });
      },
    },
  },
});
