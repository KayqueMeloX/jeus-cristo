import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/offer")({
  component: Offer,
  head: () => ({
    meta: [
      { title: "Your Divine Manifestation Script — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Offer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    let currentSrc = frame.getAttribute("src") || "/offer.html";
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return currentSrc;
        },
        set(val: string) {
          if (val && val.includes("offer.html")) {
            return;
          }
          currentSrc = val;
          frame.setAttribute("src", val);
        },
        configurable: true,
      });
    } catch (e) {}
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        key="main-offer-frame"
        src="/offer.html"
        title="Plan Faith Offer"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; payment"
        data-utmify-ignore="true"
        data-utmify-ignore-iframe="true"
      />
    </div>
  );
}
