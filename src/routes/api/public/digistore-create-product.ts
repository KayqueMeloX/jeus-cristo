import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { callDs24 } from "@/lib/digistore24.server";

// Fields documented for createProduct (sent as data[...]).
const Body = z.object({
  name: z.string().min(1).max(200),
  name_intern: z.string().min(1).max(200),
  product_type_id: z.coerce.number().int().positive(),
  language: z.string().min(2).max(5),
  description: z.string().max(2000).optional(),
  thankyou_url: z.string().url().optional(),
});

export const Route = createFileRoute("/api/public/digistore-create-product")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Admin-only: protected by the existing support admin password.
        const pass = request.headers.get("x-admin-password");
        if (!pass || pass !== process.env["SUPPORT_ADMIN_PASSWORD"]) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
        const params: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed.data)) if (v !== undefined) params[`data[${k}]`] = String(v);
        const r = await callDs24("createProduct", params);
        return Response.json(r, { status: r.ok ? 200 : 502 });
      },
    },
  },
});
