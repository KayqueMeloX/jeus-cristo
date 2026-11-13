import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OWNER_EMAIL = "kaiquepm0403@gmail.com";

/** Constant-time-ish password comparison against the SUPPORT_ADMIN_PASSWORD secret. */
function checkPassword(given: string): void {
  const expected = process.env["SUPPORT_ADMIN_PASSWORD"];
  if (!expected) throw new Error("Admin password is not configured.");
  let diff = given.length ^ expected.length;
  for (let i = 0; i < Math.max(given.length, expected.length); i++) {
    diff |= (given.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
  }
  if (diff !== 0) throw new Error("Wrong password.");
}

export const listSupportMessages = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ password: z.string().min(1).max(200) }).parse(i))
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("support_messages")
      .select("id,email,name,message,page,status,created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const replySupportMessage = createServerFn({ method: "POST" })
  .inputValidator((i) =>
    z.object({ password: z.string().min(1).max(200), id: z.string().uuid(), reply: z.string().trim().min(1).max(5000) }).parse(i),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("support_messages").select("email,name,message").eq("id", data.id).single();
    if (error || !row) throw new Error("Message not found.");
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const brevoKey = process.env["BREVO_API_KEY"];
    if (!lovableKey || !brevoKey) throw new Error("Email is not configured.");
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const res = await fetch("https://connector-gateway.lovable.dev/brevo/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": brevoKey },
      body: JSON.stringify({
        sender: { name: "My Faith Sanctuary Support", email: OWNER_EMAIL },
        to: [{ email: row.email, name: row.name || row.email }],
        subject: "Re: your message to My Faith Sanctuary",
        htmlContent: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#222"><p>${esc(data.reply).replace(/\n/g, "<br>")}</p><hr style="border:none;border-top:1px solid #eee"><p style="color:#888;font-size:13px">Your message:<br>${esc(row.message).replace(/\n/g, "<br>")}</p><p style="color:#888;font-size:12px">My Faith Sanctuary Support</p></div>`,
      }),
    });
    if (!res.ok) throw new Error(`Email failed [${res.status}]: ${await res.text()}`);
    await supabaseAdmin.from("support_messages").update({ status: "answered", updated_at: new Date().toISOString() }).eq("id", data.id);
    return { ok: true };
  });
