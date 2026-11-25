import { createFileRoute } from "@tanstack/react-router";
import { sendMetaConversionEvent } from "@/lib/meta-capi";
import { pdfFileFor } from "@/lib/prayer-tiers";
import { UPSELL_NAMES, UPSELL_PDFS } from "@/lib/whop-webhook";
import { buildUtmifyOrder, sendUtmifyOrder } from "@/lib/utmify-order";
import { parseCaktoWebhook, safeEqual } from "@/lib/cakto";

const SITE = "https://jesuscristoapp.com";
const OK = () => new Response("OK", { status: 200 });
const esc = (s: string) => s.replace(/[<>&"']/g, "");
const now = () => new Date().toISOString().slice(0, 19).replace("T", " ");

export const Route = createFileRoute("/api/public/cakto-webhook")({
  server: {
    handlers: {
      GET: async () => OK(),
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
        const sale = parseCaktoWebhook(body);
        const expected = process.env["CAKTO_WEBHOOK_SECRET"] ?? "";
        if (!safeEqual(sale.secret, expected)) { console.error("[cakto] bad secret"); return new Response("Unauthorized", { status: 401 }); }
        console.log("[cakto]", sale.event, sale.orderId, sale.status);
        if (!sale.orderId || !sale.product) return OK();

        const p = sale.product;
        const utmifyToken = process.env["UTMIFY_API_TOKEN"];
        const order = () => buildUtmifyOrder({ orderId: sale.orderId, email: sale.email, name: sale.name, amount: sale.amount, prayerCount: p.kind === "tier" ? p.count : 20, ...(p.kind === "upsell" ? { productName: UPSELL_NAMES[p.key] } : {}), approvedAt: new Date(), tracking: sale.tracking, country: null });

        if (sale.event === "refund" || sale.event === "chargeback") {
          if (utmifyToken) {
            const o = order();
            await sendUtmifyOrder(utmifyToken, { ...o, platform: "Cakto", status: sale.event === "refund" ? "refunded" : "chargedback", refundedAt: now() } as unknown as typeof o).catch((e) => console.error("[cakto] UTMify", e));
          }
          return OK();
        }
        if (sale.event !== "purchase_approved" || !sale.email) return OK();

        await sendMetaConversionEvent({ eventName: "Purchase", eventId: sale.orderId, eventSourceUrl: `${SITE}/order-complete`, userData: { email: sale.email }, customData: { value: sale.amount, currency: "USD" } });
        if (utmifyToken) {
          try { const r = await sendUtmifyOrder(utmifyToken, { ...order(), platform: "Cakto" }); console.log("[cakto] UTMify", r.status); }
          catch (e) { console.error("[cakto] UTMify failed", e); }
        }

        const lovableKey = process.env["LOVABLE_API_KEY"]; const brevoKey = process.env["BREVO_API_KEY"];
        if (!lovableKey || !brevoKey) return OK();
        const title = p.kind === "tier" ? `Your ${p.count} Sacred Prayers` : UPSELL_NAMES[p.key];
        const pdf = p.kind === "tier" ? pdfFileFor(p.count) : UPSELL_PDFS[p.key];
        const link = `${SITE}/media/ebooks/${pdf}`;
        const r = await fetch("https://connector-gateway.lovable.dev/brevo/smtp/email", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
          body: JSON.stringify({
            sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
            to: [{ email: sale.email, name: esc(sale.name) || undefined }],
            subject: `${title} — your download`,
            htmlContent: `<p>Hi ${esc(sale.name) || "friend"},</p><p>Thank you for your order. Download your guide here:</p><p><a href="${link}">${esc(title)} (PDF)</a></p><p>Daily app: <a href="${SITE}/faith-app?paid=true">${SITE}/faith-app</a></p><p>Questions? ${SITE}/support</p>`,
          }),
        });
        console.log("[cakto] Brevo", r.status);
        return OK();
      },
    },
  },
});
