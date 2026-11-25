import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { buildClientReferenceId, readTrackingGetter } from "@/lib/stripe-attribution";

const STRIPE_LINKS: Record<string, string> = {
  // Front offers — after payment Cakto sends the buyer to the first upsell (/faith-activation).
  "27": "https://pay.cakto.com.br/6dzpif7",
  "47": "https://pay.cakto.com.br/modpahe",
  "77": "https://pay.cakto.com.br/3d4v2w7",
  "100": "https://pay.cakto.com.br/3bsodw8",
  // Upsells
  activation: "https://pay.cakto.com.br/34vceic",
  activationDiscount: "https://pay.cakto.com.br/h6v6rxr",
  // No subscription product yet: skip straight to the next upsell.
  journey: "/faith-protection",
  protection: "https://pay.cakto.com.br/5sisn3q",
};

const UPSELL_VALUE: Record<string, number> = { activation: 97, activationDiscount: 47, journey: 0, protection: 47 };

export const Route = createFileRoute("/checkout")({
  component: CheckoutSlug,
  head: () => ({
    meta: [
      { title: "Secure Checkout" },
      { name: "referrer", content: "no-referrer" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function CheckoutSlug() {
  const [targetUrl, setTargetUrl] = useState("https://pay.cakto.com.br/6dzpif7");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search || "";
      const params = new URLSearchParams(search);
      const seed = params.get("plan") || params.get("seed") || params.get("id") || params.get("tier") || params.get("amt") || "27";
      const baseStripe = STRIPE_LINKS[seed.trim()] || STRIPE_LINKS["27"]!;

      const forwardParams = new URLSearchParams();
      params.forEach((val, key) => {
        if (key !== "plan" && key !== "seed" && key !== "id" && key !== "tier" && key !== "amt") {
          forwardParams.append(key, val);
        }
      });

      // UTMify reads the creative only from Stripe's client_reference_id
      const ref = buildClientReferenceId(readTrackingGetter(params));
      if (ref && !forwardParams.get("client_reference_id")) forwardParams.set("client_reference_id", ref);

      const queryString = forwardParams.toString();
      const finalUrl = queryString ? `${baseStripe}${baseStripe.includes("?") ? "&" : "?"}${queryString}` : baseStripe;
      setTargetUrl(finalUrl);

      // Track InitiateCheckout
      try {
        const w = window as any;
        if (typeof w.fbq === "function" && !w.__icFired) {
          w.__icFired = true;
          w.fbq("track", "InitiateCheckout", {
            value: UPSELL_VALUE[seed] ?? (Number(seed) || 27),
            currency: "USD",
          }, { eventID: `ic_${seed}_${Date.now()}` });
        }
      } catch (e) {}

      // UTMify InitiateCheckout is captured by its own pixel (URL rule) — no manual send, to avoid duplicates.

      // Direct navigation to Stripe (escapes all iframes, no-referrer strips origin)
      const doRedirect = () => {
        try {
          if (window.top && window.top !== window) {
            window.top.location.href = finalUrl;
            return;
          }
        } catch (e) {}
        try {
          window.location.replace(finalUrl);
        } catch (e) {
          window.location.href = finalUrl;
        }
      };

      const timer = setTimeout(doRedirect, 900);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col items-center justify-center p-5 font-sans">
      <div className="bg-[#141721] border border-[#232738] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-12 h-12 border-4 border-amber-400/20 border-t-[#f3c34e] rounded-full animate-spin mx-auto mb-5" />
        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-3.5 py-1 text-xs font-semibold mb-4">
          256-bit SSL Encrypted Connection
        </span>
        <h1 className="text-xl font-bold text-white mb-2">Securing Your Checkout</h1>
        <p className="text-sm text-gray-400 mb-6">Please wait while we connect you to our encrypted payment gateway...</p>
        <a
          href={targetUrl}
          target="_top"
          className="checkout-btn go-to-checkout inline-block w-full bg-[#f3c34e] hover:bg-[#e0a91d] text-[#121008] font-bold text-base py-3 px-5 rounded-xl shadow-lg transition-colors"
        >
          Proceed to Checkout &rarr;
        </a>
      </div>
      <footer className="mt-8 text-center text-xs text-gray-500 max-w-sm leading-relaxed">
        <p>&copy; 2026 Time to Thrive. All rights reserved. <a href="/imprint" className="underline">Imprint</a></p>
      </footer>
    </div>
  );
}
