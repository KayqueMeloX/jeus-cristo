import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { deliveryFor } from "@/lib/order-delivery";

export const Route = createFileRoute("/order-complete")({
  validateSearch: z.object({ item: z.union([z.string(), z.number()]).optional().transform((v) => (v == null ? undefined : String(v))) }),
  component: OrderComplete,
  head: () => ({
    meta: [
      { title: "Order Confirmed — Access Your Faith Guide" },
      { name: "description", content: "Your order is confirmed. Download your devotional guide instantly — no password or login required." },
      { property: "og:title", content: "Order Confirmed — Access Your Faith Guide" },
      { property: "og:description", content: "Instant download of your devotional guide, no login required." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

/** Public thank-you page meeting Digistore24 criteria: no login, clear access, billing note, guarantee, support. */
function OrderComplete() {
  const { item } = Route.useSearch();
  const d = deliveryFor(item);
  const pdfUrl = `/media/ebooks/${d.pdf}`;
  return (
    <div className="theme-sanctuary min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-center text-3xl font-bold text-primary">Thank you — your order is confirmed</h1>
        <p className="mt-3 text-center text-muted-foreground">Product: <strong className="text-foreground">{d.title}</strong></p>

        <section className="mt-8 space-y-4 rounded-2xl border border-primary bg-card p-6">
          <h2 className="text-xl font-bold">How to access your product</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            <li>Click the button below to download your PDF guide right now. No password or login is required.</li>
            <li>A copy of the download link was also sent to the email you used at checkout (check your spam folder).</li>
            <li>Optionally, open the free web devotional app on your phone — no account needed.</li>
          </ol>
          <a href={pdfUrl} download className="block rounded-xl bg-primary px-5 py-4 text-center font-bold text-primary-foreground">
            Download my PDF guide
          </a>
          <a href="/faith-app?paid=true" className="block rounded-xl border border-primary px-5 py-3 text-center font-semibold text-primary">
            Open the web devotional app
          </a>
        </section>

        <section className="mt-6 space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Billing:</strong> Your payment was processed by Digistore24. The charge will appear on your credit card or bank statement as Digistore24.</p>
          <p><strong className="text-foreground">60-day money-back guarantee:</strong> If you are not satisfied, request a full refund within 60 days of purchase. See our <a href="/refund" className="underline">Refund Policy</a>.</p>
          <p><strong className="text-foreground">Support:</strong> Email <a href="mailto:kaiquepm0403@gmail.com" className="underline">kaiquepm0403@gmail.com</a> or use our <a href="/support" className="underline">support page</a>. We reply within 24 hours.</p>
          <p><a href="/imprint" className="underline">Imprint / Legal Notice</a> · <a href="/terms" className="underline">Terms</a> · <a href="/privacy" className="underline">Privacy</a></p>
        </section>
      </main>
    </div>
  );
}
