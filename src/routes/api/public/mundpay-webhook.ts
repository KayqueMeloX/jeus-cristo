import { createFileRoute } from "@tanstack/react-router";
import { sendMetaConversionEvent } from "@/lib/meta-capi";
import { pdfFileFor } from "@/lib/prayer-tiers";
import { UPSELL_NAMES, UPSELL_PDFS } from "@/lib/whop-webhook";
import { parseMundpaySale, productsForSale } from "@/lib/mundpay";
import { buildUtmifyOrder, sendUtmifyOrder } from "@/lib/utmify-order";
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
        if (!validated.success) {
          // Log only field paths and messages, never customer data.
          console.error("[mundpay] invalid payload", JSON.stringify(validated.error.issues.map((i) => ({ path: i.path.join("."), message: i.message }))));
          return new Response("Invalid sale payload", { status: 400 });
        }
        const sale = parseMundpaySale(validated.data);

        const products = productsForSale(sale.offers);
        if (sale.status !== "paid" || products.length === 0 || !sale.email) {
          if (sale.status === "paid") console.error("[mundpay] paid order with no recognised product", sale.orderId);
          return OK();
        }

        await sendMetaConversionEvent({ eventName: "Purchase", eventId: sale.orderId, eventSourceUrl: `${SITE}/faith-app`, userData: { email: sale.email }, customData: { value: sale.amount, currency: sale.currency } });

        // Backup delivery to UTMify: same orderId as Mundpay's native integration, so UTMify merges rather than duplicates.
        const utmifyToken = process.env["UTMIFY_API_TOKEN"];
        if (utmifyToken) {
          try {
            const first = products[0]!;
            const order = buildUtmifyOrder({
              orderId: sale.orderId, email: sale.email, name: sale.name, amount: sale.amount,
              prayerCount: first.kind === "tier" ? first.count : 0,
              productName: products.map((p) => p.kind === "tier" ? `Seed of Faith — ${p.count} Sacred Prayers` : UPSELL_NAMES[p.key]).join(" + "),
              platform: "Mundpay", approvedAt: new Date(), tracking: sale.tracking,
            });
            const r = await sendUtmifyOrder(utmifyToken, order);
            if (!r.ok) console.error(`[mundpay] UTMify failed [${r.status}] ${r.body.slice(0, 300)}`);
          } catch (e) { console.error("[mundpay] UTMify error", e instanceof Error ? e.message : e); }
        }

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (!lovableKey || !brevoKey) return OK();
        const items = products.map((product) => ({
          title: product.kind === "tier" ? `Your ${product.count} Sacred Prayers` : UPSELL_NAMES[product.key],
          pdf: product.kind === "tier" ? pdfFileFor(product.count) : UPSELL_PDFS[product.key],
        })).filter((item, i, all) => all.findIndex((o) => o.pdf === item.pdf) === i);
        const title = items.map((i) => i.title).join(" + ");
        const buttons = items.map((i) => `<p><a href="${SITE}/media/ebooks/${i.pdf}" style="background:#e0a91d;color:#120e04;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">Download: ${esc(i.title)}</a></p>`).join("");
        const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
          body: JSON.stringify({
            sender: { name: "My Faith Sanctuary", email: "kaiquepm0403@gmail.com" },
            to: [{ email: sale.email, name: sale.name }],
            subject: `[Access Granted] ${title} — My Faith Sanctuary`,
            htmlContent: `<div style="font-family:Georgia,serif;max-width:580px;margin:auto;padding:28px;background:#fffaf0;color:#2b200b"><h2 style="color:#b88812">Welcome, ${esc(sale.name)}</h2><p>Your purchase of <b>${esc(title)}</b> is confirmed.</p>${buttons}<p><a href="${SITE}/faith-app?paid=true" style="color:#8a6a1b;font-weight:bold">Open your Members App &rarr;</a></p><p style="font-size:13px;color:#666">No login needed — your progress is saved on your phone.</p></div>`,
            attachment: items.map((i) => ({ url: `${SITE}/media/ebooks/${i.pdf}`, name: i.pdf })),
          }),
        });
        if (!res.ok) console.error(`[mundpay] Brevo failed [${res.status}]`);
        return OK();
      },
    },
  },
});
