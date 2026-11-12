import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/offer")({
  component: OfferPage,
  head: () => ({
    meta: [
      { title: "Your Divine Manifestation Script — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

const WINNERS = [
  { name: "Brian Sides", img: "/winner-brian.webp" },
  { name: "Christine & Nick Jane", img: "/winner-christine.jpg" },
  { name: "Deivison Alves Martins", img: "/winner-deivison.jpg" },
  { name: "Robert Benaglio", img: "/winner-robert.jpg" },
  { name: "Roberta Trumbo", img: "/winner-roberta.jpg" },
  { name: "Terry Kennedy & Kay Yoxall", img: "/winner-terry-kay.jpg" },
  { name: "Terry Peace", img: "/winner-terry.jpg" },
  { name: "Jamie Kay, England", img: "/winner-jamie.webp" },
];

const STRIPE_LINKS: Record<string, string> = {
  "27": "https://buy.stripe.com/28EdR99ibdEj1RVfl8ao803",
  "47": "https://buy.stripe.com/aFa5kD9ibgQveEH0qeao804",
  "77": "https://buy.stripe.com/9B6cN565Z43JeEH6OCao805",
  "100": "https://buy.stripe.com/28EaEX51V7fVfILb4Sao806",
};

const SEEDS = [
  { amt: "27", label: "$27", img: "/seed-of-faith-27.jpg", fallback: "/seed-of-fath-27.jpg" },
  { amt: "47", label: "$47", img: "/seed-of-faith47.jpg", fallback: "/seed-of-faith47.jpg" },
  { amt: "77", label: "$77", img: "/seed-of-fath-77.jpg", fallback: "/seed-of-fath-77.jpg" },
  { amt: "100", label: "$100", img: "/seed-of-faith-100.jpg", fallback: "/seed-of-faith-100.jpg" },
];

export function OfferPage() {
  const [userName, setUserName] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Get user name from sessionStorage
    try {
      const state = JSON.parse(sessionStorage.getItem("planfaith_offer") || "null");
      if (state && state.name) {
        setUserName(String(state.name).trim().toUpperCase());
      }
    } catch (e) {}

    // 2. Format today date
    try {
      setTodayDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } catch (e) {}

    // 3. Load support widget if not present
    try {
      if (typeof document !== "undefined" && !document.getElementById("faith-support-root")) {
        const s = document.createElement("script");
        s.src = "/media/support-widget.js";
        s.defer = true;
        document.body.appendChild(s);
      }
    } catch (e) {}
  }, []);

  const handleUnmute = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      v.loop = false;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}
    setIsMuted(false);
  };

  const handleVideoClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isMuted) {
      handleUnmute();
    } else {
      if (v.paused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  };

  const getCheckoutUrl = (amt: string) => {
    if (typeof window === "undefined") return `/checkout?seed=${amt}`;
    let search = window.location.search || "";
    try {
      if (window.top && window.top !== window && window.top.location.search) {
        search = window.top.location.search;
      }
    } catch (e) {}
    const params = new URLSearchParams(search);
    params.set("seed", amt);
    return `/checkout?${params.toString()}`;
  };

  const handleCheckoutClick = (amt: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Salvar no localStorage
    try {
      localStorage.setItem("faith_selected_seed", amt);
    } catch (err) {}

    // 2. Disparar Meta Pixel InitiateCheckout
    try {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "InitiateCheckout", {
          value: Number(amt),
          currency: "USD",
        });
      }
    } catch (err) {}

    // 3. Disparar UTMify InitiateCheckout
    try {
      const bytes = new Uint8Array(12);
      if (typeof window !== "undefined" && window.crypto) {
        window.crypto.getRandomValues(bytes);
      }
      const hex24 = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      const utmifyPayload = {
        type: "InitiateCheckout",
        lead: {
          pixelId: "6aeba9286e9f16208dd93510",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
        event: {
          sourceUrl: typeof window !== "undefined" ? window.location.href : "https://godjesus.lovable.app/offer",
          pageTitle: typeof document !== "undefined" ? document.title : "Special Sacred Offer",
        },
        eventId: hex24.length === 24 ? hex24 : "46b0fba09ae34e40b4911a82",
        detectedBy: "keyword",
      };
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(
          "https://tracking.utmify.com.br/tracking/v1/events",
          new Blob([JSON.stringify(utmifyPayload)], { type: "application/json" })
        );
      }
    } catch (e) {}

    // 4. Se estiver dentro de iframe, forçar navegação no frame pai
    try {
      if (typeof window !== "undefined" && window.top && window.top !== window) {
        e.preventDefault();
        window.top.location.href = getCheckoutUrl(amt);
      }
    } catch (err) {}
  };

  return (
    <div className="relative isolate min-h-screen w-full text-[#fff7e6] font-serif">
      {/* Fixed background image + dark overlay (same structure as reference page) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/background.jpg')", backgroundColor: "#050403" }}
      >
        <div className="absolute inset-0 bg-[rgba(22,18,12,0.82)]" />
      </div>

      <div className="mx-auto max-w-[760px] px-4 py-7 text-center">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="TIME TO THRIVE"
          className="mx-auto mb-4 block h-auto w-[150px] max-w-[52%] drop-shadow-[0_0_22px_rgba(243,195,78,0.35)]"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />

        {/* Headline */}
        <h1 className="mx-auto my-2 max-w-[690px] text-3xl font-bold leading-tight text-[#f3c34e] sm:text-4xl">
          {userName
            ? `${userName}, you've made it this far… and that's no accident.`
            : "You've made it this far… and that's no accident."}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-6 max-w-[640px] text-lg text-[#fff7e6] sm:text-xl">
          Today is <b className="text-[#f3c34e]">{todayDate || "today"}</b> — the first day of your
          new reality.
        </p>

        {/* Video Box */}
        <div className="relative mx-auto my-6 max-w-[400px] overflow-hidden rounded-[18px] bg-black shadow-[0_0_35px_rgba(243,195,78,0.25)]">
          <div className="relative w-full pt-[178.22%]">
            <video
              ref={videoRef}
              playsInline
              webkit-playsinline="true"
              disablePictureInPicture
              autoPlay
              muted
              loop
              preload="auto"
              poster="/media/vsl-poster.jpg"
              onClick={handleVideoClick}
              onTimeUpdate={() => {
                const v = videoRef.current;
                if (v && v.duration) {
                  setProgress((v.currentTime / v.duration) * 100);
                }
              }}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            >
              <source src="/media/vsl.mp4" type="video/mp4" />
            </video>

            {/* Red "Click to Listen" Overlay */}
            {isMuted && (
              <div
                onClick={handleUnmute}
                className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-black/30 transition-opacity duration-300"
              >
                <div className="flex w-[180px] max-w-[85%] animate-pulse flex-col items-center rounded-[10px] bg-[#b31414] px-5 py-4 text-center shadow-[0_0_30px_rgba(179,20,20,0.8)]">
                  <div className="font-sans text-[18px] font-bold leading-tight text-white">
                    Click to
                    <br />
                    <span className="text-[26px] font-extrabold tracking-wide">Listen</span>
                  </div>
                  <div className="my-2">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  </div>
                  <div className="font-sans text-[11px] leading-tight text-white/95">
                    and be first to hear his incredible message
                  </div>
                </div>
              </div>
            )}

            {/* Custom Progress Bar */}
            <div className="absolute bottom-0 left-0 z-10 h-1.5 w-full bg-white/20">
              <div
                className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f3c34e] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CHECKOUT OFFER CONTENT — ALWAYS 100% VISIBLE AND FIXED */}
        {/* ======================================================== */}
        <div id="offerPitch" className="block w-full">
          {/* Recent Winners */}
          <div id="winners" className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-[#f3c34e] sm:text-3xl">
              🏆 Recent Winners
            </h2>
            <div className="mx-auto grid max-w-[520px] grid-cols-2 gap-3.5 sm:max-w-[820px] sm:grid-cols-4">
              {WINNERS.map((w, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={w.img}
                    alt={w.name}
                    loading="lazy"
                    className="aspect-square w-full rounded-[14px] border-[3px] border-[#f3c34e] object-cover shadow-[0_0_16px_rgba(243,195,78,0.3)]"
                  />
                  <div className="mt-2 text-sm font-bold text-[#f3c34e]">{w.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What you receive */}
          <div id="cleanInfo" className="my-8">
            <p className="mx-auto max-w-[640px] text-lg leading-relaxed sm:text-xl">
              What you receive: a personalized digital inspirational Script and the complete{" "}
              <b className="text-[#f3c34e]">Faith &amp; Abundance Blueprint</b> — a 200+ page
              biblical guide of prayers, scriptures, and daily declarations for every area of your
              life.
            </p>

            <div className="my-5 flex flex-wrap justify-center gap-3">
              <div className="rounded-[12px] border-2 border-[#f3c34e] bg-[#16120a]/70 px-4 py-3 text-sm font-bold sm:text-base">
                📩 Delivered instantly by email
              </div>
              <div className="rounded-[12px] border-2 border-[#f3c34e] bg-[#16120a]/70 px-4 py-3 text-sm font-bold sm:text-base">
                📱 100% digital — no shipping
              </div>
              <div className="rounded-[12px] border-2 border-[#f3c34e] bg-[#16120a]/70 px-4 py-3 text-sm font-bold sm:text-base">
                🔒 Secure checkout
              </div>
            </div>

            <p className="italic text-[#ffe9ab]">
              Backed by our 7-day money-back guarantee — see our{" "}
              <a href="/refund" className="font-bold text-[#f3c34e] underline">
                Refund Policy
              </a>
              .
            </p>
          </div>

          {/* Make your choice now Header */}
          <h2 id="chooseHead" className="my-8 text-2xl font-bold text-[#f3c34e] sm:text-3xl">
            {userName ? `${userName}, make your choice now` : "Make your choice now"}
          </h2>

          {/* 4 Seeds Section (Images + Checkout Buttons) */}
          <div id="seeds" className="mx-auto flex max-w-[600px] flex-col gap-8">
            {SEEDS.map((s) => (
              <div key={s.amt} className="mx-auto flex w-full max-w-[420px] flex-col gap-3">
                {/* Seed Card (Image) */}
                <a
                  href={getCheckoutUrl(s.amt)}
                  onClick={(e) => handleCheckoutClick(s.amt, e)}
                  data-checkout-url={STRIPE_LINKS[s.amt]}
                  className="checkout-btn go-to-checkout block w-full cursor-pointer overflow-hidden rounded-[16px] border-[3px] border-[#f3c34e] shadow-none transition-transform hover:brightness-105 active:scale-[0.98]"
                >
                  <img
                    src={s.img}
                    alt={`Seed of Faith ${s.label}`}
                    loading="lazy"
                    onError={(e) => {
                      if (s.fallback && e.currentTarget.src !== s.fallback) {
                        e.currentTarget.src = s.fallback;
                      }
                    }}
                    className="aspect-square w-full object-cover"
                  />
                </a>

                {/* Seed CTA Button */}
                <a
                  href={getCheckoutUrl(s.amt)}
                  onClick={(e) => handleCheckoutClick(s.amt, e)}
                  data-checkout-url={STRIPE_LINKS[s.amt]}
                  className="checkout-btn go-to-checkout block w-full cursor-pointer rounded-[16px] bg-gradient-to-b from-[#f7d873] to-[#e0a91d] py-4 px-3 text-center text-xl font-bold text-[#1a1206] shadow-[0_6px_0_#b8911f] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_#b8911f] sm:text-2xl"
                  style={{ textDecoration: "none" }}
                >
                  This is the life I choose — {s.label}
                </a>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mx-auto mt-14 max-w-[860px] border-t border-[#3a3018] px-4 pt-7 pb-4 text-center text-sm leading-relaxed text-[#9a8f6f]">
            <div className="mb-3 flex flex-wrap justify-center gap-4 font-bold">
              <a href="/terms" className="text-[#cdb86a] underline">
                Terms of Use
              </a>
              <a href="/privacy" className="text-[#cdb86a] underline">
                Privacy Policy
              </a>
              <a href="/refund" className="text-[#cdb86a] underline">
                Refund Policy
              </a>
              <a href="/support" className="text-[#cdb86a] underline">
                Support
              </a>
            </div>
            <p className="mb-2">Digital product delivered by email immediately after purchase.</p>
            <p className="mx-auto max-w-[640px] text-xs italic opacity-85">
              Educational and inspirational content. Results vary from person to person. This is not
              financial, medical, or professional advice.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
