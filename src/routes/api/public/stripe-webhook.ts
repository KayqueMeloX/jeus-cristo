import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pdfFileFor, prayerCountForAmount, verifyStripeSignature } from "@/lib/prayer-tiers";

const SITE = "https://godjesus.lovable.app";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";

const sessionSchema = z.object({
  type: z.string(),
  data: z.object({
    object: z.object({
      amount_total: z.number().nullable().optional(),
      customer_details: z.object({ email: z.string().email().nullable().optional(), name: z.string().nullable().optional() }).nullable().optional(),
      customer_email: z.string().email().nullable().optional(),
    }).passthrough(),
  }),
});

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

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_WEBHOOK_SECRET"];
        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (!secret || !lovableKey || !brevoKey) {
          console.error("stripe-webhook: missing configuration");
          return new Response("Not configured", { status: 500 });
        }
        const body = await request.text();
        const ok = await verifyStripeSignature(body, request.headers.get("stripe-signature"), secret);
        if (!ok) return new Response("Invalid signature", { status: 401 });

        let event: z.infer<typeof sessionSchema>;
        try {
          event = sessionSchema.parse(JSON.parse(body));
        } catch {
          return new Response("ignored", { status: 200 });
        }
        if (event.type !== "checkout.session.completed") return new Response("ignored", { status: 200 });

        const obj = event.data.object;
        const email = obj.customer_details?.email || obj.customer_email;
        if (!email) return new Response("no email", { status: 200 });
        const count = prayerCountForAmount((obj.amount_total ?? 0) / 100);
        const name = obj.customer_details?.name || "Blessed Friend";

        const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": brevoKey,
          },
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
