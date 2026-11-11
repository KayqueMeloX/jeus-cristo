import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Payment Approved — Welcome to My Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function ThankYouPage() {
  const [loginUrl, setLoginUrl] = useState("/faith-app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoginUrl(`/faith-app${window.location.search}`);

      try {
        const p = new URLSearchParams(window.location.search);
        const val = Number(p.get("value") || p.get("amt") || p.get("price") || 27);
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "Purchase", { value: val, currency: "USD" });
        }
      } catch (e) {}
    }
  }, []);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = loginUrl;
        return;
      }
    } catch (err) {}
    window.location.href = loginUrl;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#151105_0%,_#080705_60%,_#030302_100%)] text-[#f7f3ea] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-lg w-full bg-[#120e08]/95 border border-[#f3c34e]/35 rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_50px_rgba(243,195,78,0.15),0_20px_40px_rgba(0,0,0,0.8)]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#f3c34e] text-[#1a1200] flex items-center justify-center mx-auto mb-5 shadow-[0_0_35px_rgba(243,195,78,0.5)]">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#f3c34e] mb-3">Payment Approved!</h1>
        <p className="text-[#e5dac2] text-sm sm:text-base leading-relaxed mb-7">
          Your faith decision is confirmed. Your personalized Sanctuary and daily guided materials are ready for you.
        </p>

        <div className="space-y-3 text-left mb-8">
          <div className="bg-white/[0.03] border border-[#f3c34e]/20 rounded-xl p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#f3c34e]/15 border border-[#f3c34e] text-[#f3c34e] font-extrabold text-xs flex items-center justify-center shrink-0">1</div>
            <div>
              <h4 className="text-white font-bold text-sm">Check Your Email</h4>
              <p className="text-[#bfae8b] text-xs">We've sent your official purchase receipt and order confirmation.</p>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-[#f3c34e]/20 rounded-xl p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#f3c34e]/15 border border-[#f3c34e] text-[#f3c34e] font-extrabold text-xs flex items-center justify-center shrink-0">2</div>
            <div>
              <h4 className="text-white font-bold text-sm">Access the Members Area</h4>
              <p className="text-[#bfae8b] text-xs">Click the button below to go to the member login portal.</p>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-[#f3c34e]/20 rounded-xl p-3.5 flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#f3c34e]/15 border border-[#f3c34e] text-[#f3c34e] font-extrabold text-xs flex items-center justify-center shrink-0">3</div>
            <div>
              <h4 className="text-white font-bold text-sm">Log In with Your Email</h4>
              <p className="text-[#bfae8b] text-xs">Enter your email to unlock your audio vault immediately.</p>
            </div>
          </div>
        </div>

        <a
          href={loginUrl}
          onClick={handleLogin}
          target="_top"
          className="block w-full bg-gradient-to-r from-[#f7d873] to-[#e0a91d] text-[#150f03] font-extrabold text-lg py-4 px-6 rounded-2xl shadow-[0_4px_25px_rgba(243,195,78,0.4)] hover:shadow-[0_6px_30px_rgba(243,195,78,0.6)] transition-all cursor-pointer"
        >
          Access Members Area &amp; Log In &rarr;
        </a>

        <p className="mt-4 text-xs text-[#a89a7c]">
          Instant digital access &middot; Available 24/7 on mobile, tablet &amp; desktop.
        </p>
      </div>

      <footer className="mt-8 text-center text-xs text-[#7a6e54] leading-relaxed">
        <p><strong>FAKKO SOLUTIONS LLC</strong> &middot; EIN 47-3829164</p>
        <p>30 N Gould St, Sheridan, WY 82801, United States</p>
        <p>Support: <a href="mailto:support.fakko.solutions@gmail.com" className="text-[#d8cba7] underline">support.fakko.solutions@gmail.com</a></p>
      </footer>
    </div>
  );
}
