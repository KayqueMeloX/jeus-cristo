import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    let currentSrc = frame.getAttribute("src") || "/thank-you.html";
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return currentSrc;
        },
        set(val: string) {
          if (val && val.includes("thank-you.html")) {
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
        key="main-thankyou-frame"
        src="/thank-you.html"
        title="Payment Approved"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; clipboard-write"
        data-utmify-ignore="true"
        data-utmify-ignore-iframe="true"
      />
    </div>
  );
}
