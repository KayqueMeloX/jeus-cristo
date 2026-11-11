import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STRIPE_LINKS: Record<string, string> = {
  "27": "https://buy.stripe.com/28EdR99ibdEj1RVfl8ao803",
  "47": "https://buy.stripe.com/aFa5kD9ibgQveEH0qeao804",
  "77": "https://buy.stripe.com/9B6cN565Z43JeEH6OCao805",
  "100": "https://buy.stripe.com/28EaEX51V7fVfILb4Sao806",
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutSlug,
  head: () => ({
    meta: [
      { title: "Secure Checkout — FAKKO SOLUTIONS LLC" },
      { name: "referrer", content: "no-referrer" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function CheckoutSlug() {
  const [targetUrl, setTargetUrl] = useState("https://buy.stripe.com/28EdR99ibdEj1RVfl8ao803");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search || "";
      const params = new URLSearchParams(search);
      const seed = params.get("seed") || params.get("id") || params.get("tier") || params.get("amt") || "27";
      const baseStripe = STRIPE_LINKS[seed.trim()] || STRIPE_LINKS["27"];

      const forwardParams = new URLSearchParams();
      params.forEach((val, key) => {
        if (key !== "seed" && key !== "id" && key !== "tier" && key !== "amt") {
          forwardParams.append(key, val);
        }
      });

      const queryString = forwardParams.toString();
      const finalUrl = queryString ? `${baseStripe}${baseStripe.includes("?") ? "&" : "?"}${queryString}` : baseStripe;
      setTargetUrl(finalUrl);

      // Track InitiateCheckout
      try {
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "InitiateCheckout", {
            value: Number(seed) || 27,
            currency: "USD",
          });
        }
      } catch (e) {}

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

      const timer = setTimeout(doRedirect, 150);
      return () => clearTimeout(timer);
    }
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
          className="inline-block w-full bg-[#f3c34e] hover:bg-[#e0a91d] text-[#121008] font-bold text-base py-3 px-5 rounded-xl shadow-lg transition-colors"
        >
          Proceed to Checkout &rarr;
        </a>
      </div>
      <footer className="mt-8 text-center text-xs text-gray-500 max-w-sm leading-relaxed">
        <p><strong>FAKKO SOLUTIONS LLC</strong> &middot; EIN 47-3829164</p>
        <p>30 N Gould St, Sheridan, WY 82801, United States</p>
        <p>Support: support.fakko.solutions@gmail.com</p>
      </footer>
    </div>
  );
}
