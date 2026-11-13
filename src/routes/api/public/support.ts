import { createFileRoute } from "@tanstack/react-router";
import { supportMessageSchema } from "@/lib/support-schema";

const OWNER_EMAIL = "kaiquepm0403@gmail.com";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export const Route = createFileRoute("/api/public/support")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let parsed;
        try {
          parsed = supportMessageSchema.safeParse(await request.json());
        } catch {
          return Response.json({ ok: false, error: "invalid" }, { status: 400, headers: CORS });
        }
        if (!parsed.success) {
          return Response.json({ ok: false, error: "A valid email is required." }, { status: 400, headers: CORS });
        }
        const d = parsed.data;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("support_messages").insert({
          email: d.email,
          name: d.name || null,
          message: d.message,
          page: d.page ?? null,
        });
        if (error) {
          console.error("support insert failed", error);
          return Response.json({ ok: false }, { status: 500, headers: CORS });
        }

        // Notify the owner's inbox (best effort; the message is already saved).
        const lovableKey = process.env["LOVABLE_API_KEY"];
        const brevoKey = process.env["BREVO_API_KEY"];
        if (lovableKey && brevoKey) {
          const r = await fetch("https://connector-gateway.lovable.dev/brevo/smtp/email", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
            body: JSON.stringify({
              sender: { name: "Sanctuary Support", email: OWNER_EMAIL },
              to: [{ email: OWNER_EMAIL }],
              replyTo: { email: d.email, name: d.name || d.email },
              subject: `Nova mensagem de suporte: ${d.email}`,
              htmlContent: `<p><b>Email:</b> ${esc(d.email)}<br><b>Nome:</b> ${esc(d.name || "-")}</p><blockquote style="border-left:4px solid #f3c34e;padding:10px">${esc(d.message).replace(/\n/g, "<br>")}</blockquote><p>Página: ${esc(d.page || "-")}</p><p>Responda este e-mail ou abra /supportemail.</p>`,
            }),
          }).catch((e) => { console.error("notify failed", e); return null; });
          if (r && !r.ok) console.error(`notify failed [${r.status}]: ${await r.text()}`);
        }
        return Response.json({ ok: true }, { headers: CORS });
      },
    },
  },
});
