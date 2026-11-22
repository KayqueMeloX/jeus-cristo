import { createFileRoute } from "@tanstack/react-router";
import { sendMetaConversionEvent } from "@/lib/meta-capi";
import { pdfFileFor } from "@/lib/prayer-tiers";
import { UPSELL_NAMES, UPSELL_PDFS } from "@/lib/whop-webhook";
import { buildUtmifyOrder, extractUtms, sendUtmifyOrder } from "@/lib/utmify-order";
import { DS24_PRODUCTS, parseDs24Ipn } from "@/lib/digistore-ipn";
import { callDs24 } from "@/lib/digistore24.server";

const SITE = "https://jesuscristoapp.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";
// Digistore24 only treats a plain "OK" with HTTP 200 as success.
const OK = () => new Response("OK", { status: 200, headers: { "Content-Type": "text/plain" } });
const esc = (s: string) => s.replace(/[<>&"']/g, "");

export const Route = createFileRoute("/api/public/digistore-ipn")({
  server: {
    handlers: {
      GET: async () => OK(),
      POST: async ({ request }) => {
        const ipn = parseDs24Ipn(await request.text());
        console.log("[ds24-ipn]", ipn.event, ipn.orderId, ipn.productId);
        if (ipn.event === "connection_test" || !ipn.orderId) return OK();

        // No IPN passphrase is set, so confirm the order really exists in our Digistore24 account.
        const check = await callDs24("getPurchase", { purchase_id: ipn.orderId });
        if (!check.ok) { console.error("[ds24-ipn] order not verified", ipn.orderId, check.message); return new Response("Unverified", { status: 403 }); }

        const product = DS24_PRODUCTS[ipn.productId];
        const tracking = extractUtms(ipn.raw);
        const utmifyToken = process.env["UTMIFY_API_TOKEN"];

        if (ipn.event === "on_refund" || ipn.event === "on_chargeback") {
          if (utmifyToken && product) {
            const order = buildUtmifyOrder({ orderId: ipn.orderId, email: ipn.email, name: ipn.name, amount: ipn.amount, prayerCount: product.kind === "tier" ? product.count : 20, ...(product.kind === "upsell" ? { productName: UPSELL_NAMES[product.key] } : {}), approvedAt: new Date(), tracking, country: ipn.country });
            const r = await sendUtmifyOrder(utmifyToken, { ...order, platform: "Digistore24", status: ipn.event === "on_refund" ? "refunded" : "chargedback", refundedAt: new Date().toISOString().slice(0, 19).replace("T", " ") } as unknown as typeof order);
            console.log("[ds24-ipn] UTMify refund:", r.status);
          }
          return OK();
        }
        if (ipn.event !== "on_payment" || !product || !ipn.email) return OK();

        const capi = await sendMetaConversionEvent({ eventName: "Purchase", eventId: ipn.orderId, eventSourceUrl: `${SITE}/faith-app`, userData: { email: ipn.email }, customData: { value: ipn.amount, currency: ipn.currency } });
        console.log("[ds24-ipn] Meta CAPI:", JSON.stringify(capi));

        if (utmifyToken) {
          try {
            const order = buildUtmifyOrder({ orderId: ipn.orderId, email: ipn.email, name: ipn.name, amount: ipn.amount, prayerCount: product.kind === "tier" ? product.count : 20, ...(product.kind === "upsell" ? { productName: UPSELL_NAMES[product.key] } : {}), approvedAt: new Date(), tracking, country: ipn.country });
            const r = await sendUtmifyOrder(utmifyToken, { ...order, platform: "Digistore24" });
            console.log("[ds24-ipn] UTMify:", r.status, r.body.slice(0, 200));
          } catch (e) { console.error("[ds24-ipn] UTMify failed", e); }
        }

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (!lovableKey || !brevoKey) { console.error("[ds24-ipn] Brevo not configured"); return OK(); }
        const title = product.kind === "tier" ? `Your ${product.count} Sacred Prayers` : UPSELL_NAMES[product.key];
        const pdf = product.kind === "tier" ? pdfFileFor(product.count) : UPSELL_PDFS[product.key];
        const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
          body: JSON.stringify({
            sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
            to: [{ email: ipn.email, name: ipn.name }],
            subject: `[Access Granted] ${title} — My Faith Sanctuary`,
            htmlContent: `<div style="font-family:Georgia,serif;max-width:580px;margin:auto;padding:28px;background:#fffaf0;color:#2b200b"><h2 style="color:#b88812">Welcome, ${esc(ipn.name)}</h2><p>Your purchase of <b>${esc(title)}</b> is confirmed.</p><p><a href="${SITE}/media/ebooks/${pdf}" style="background:#e0a91d;color:#120e04;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Download your PDF</a></p><p><a href="${SITE}/faith-app?paid=true" style="color:#8a6a1b;font-weight:bold">Open your Members App &rarr;</a></p><p style="font-size:13px;color:#666">No login needed — your progress is saved on your phone.</p></div>`,
            attachment: [{ url: `${SITE}/media/ebooks/${pdf}`, name: pdf }],
          }),
        });
        if (!res.ok) console.error(`[ds24-ipn] Brevo failed [${res.status}]: ${await res.text()}`);
        return OK();
      },
    },
  },
});
