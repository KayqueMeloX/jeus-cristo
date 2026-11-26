import { createFileRoute } from "@tanstack/react-router";
import { sendMetaConversionEvent } from "@/lib/meta-capi";
import { pdfFileFor } from "@/lib/prayer-tiers";
import { UPSELL_NAMES, UPSELL_PDFS } from "@/lib/whop-webhook";
import { buildUtmifyOrder, sendUtmifyOrder } from "@/lib/utmify-order";
import { parseMundpaySale, productForOffer } from "@/lib/mundpay";
import { authorizeMundpayWebhook, mundpayWebhookSchema } from "@/lib/mundpay-webhook-security";

const SITE = "https://jesuscristoapp.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";
const OK = () => new Response("OK", { status: 200 });
const esc = (s: string) => s.replace(/[<>&"']/g, "");

export const Route = createFileRoute("/api/public/mundpay-webhook")({
  server: {
    handlers: {
      GET: async () => OK(),
      POST: async ({ request }) => {
        const denied = await authorizeMundpayWebhook(request, process.env["MUNDPAY_WEBHOOK_SECRET"]);
        if (denied) return denied;
        let body: unknown;
        try { body = await request.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
        const validated = mundpayWebhookSchema.safeParse(body);
        if (!validated.success) return new Response("Invalid sale payload", { status: 400 });
        const sale = parseMundpaySale(validated.data);

        const utmifyToken = process.env["UTMIFY_API_TOKEN"];
        const offer = sale.offers[0] ?? {};
        const product = productForOffer(offer);
        const orderBase = () => buildUtmifyOrder({ orderId: sale.orderId, email: sale.email, name: sale.name, amount: sale.amount, prayerCount: product?.kind === "tier" ? product.count : 20, ...(product?.kind === "upsell" ? { productName: UPSELL_NAMES[product.key] } : {}), approvedAt: new Date(), tracking: sale.tracking, country: null });

        if (sale.status === "refunded" || sale.status === "chargeback" || sale.status === "chargedback") {
          if (utmifyToken && product) {
            const order = orderBase();
            await sendUtmifyOrder(utmifyToken, { ...order, platform: "Mundpay", status: sale.status === "refunded" ? "refunded" : "chargedback", refundedAt: new Date().toISOString().slice(0, 19).replace("T", " ") } as unknown as typeof order);
          }
          return OK();
        }
        if (sale.status !== "paid" || !product || !sale.email) return OK();

        await sendMetaConversionEvent({ eventName: "Purchase", eventId: sale.orderId, eventSourceUrl: `${SITE}/faith-app`, userData: { email: sale.email }, customData: { value: sale.amount, currency: sale.currency } });
        if (utmifyToken) {
          try { const r = await sendUtmifyOrder(utmifyToken, { ...orderBase(), platform: "Mundpay" }); console.log("[mundpay] UTMify:", r.status); }
          catch (e) { console.error("[mundpay] UTMify failed", e); }
        }

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (!lovableKey || !brevoKey) return OK();
        const title = product.kind === "tier" ? `Your ${product.count} Sacred Prayers` : UPSELL_NAMES[product.key];
        const pdf = product.kind === "tier" ? pdfFileFor(product.count) : UPSELL_PDFS[product.key];
        const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
          body: JSON.stringify({
            sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
            to: [{ email: sale.email, name: sale.name }],
            subject: `[Access Granted] ${title} — My Faith Sanctuary`,
            htmlContent: `<div style="font-family:Georgia,serif;max-width:580px;margin:auto;padding:28px;background:#fffaf0;color:#2b200b"><h2 style="color:#b88812">Welcome, ${esc(sale.name)}</h2><p>Your purchase of <b>${esc(title)}</b> is confirmed.</p><p><a href="${SITE}/media/ebooks/${pdf}" style="background:#e0a91d;color:#120e04;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Download your PDF</a></p><p><a href="${SITE}/faith-app?paid=true" style="color:#8a6a1b;font-weight:bold">Open your Members App &rarr;</a></p><p style="font-size:13px;color:#666">No login needed — your progress is saved on your phone.</p></div>`,
            attachment: [{ url: `${SITE}/media/ebooks/${pdf}`, name: pdf }],
          }),
        });
        if (!res.ok) console.error(`[mundpay] Brevo failed [${res.status}]`);
        return OK();
      },
    },
  },
});
