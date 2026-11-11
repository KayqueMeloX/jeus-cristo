import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Payment Approved — Welcome to My Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

export function ThankYouPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [initialSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return `/thank-you.html${window.location.search}`;
    }
    return "/thank-you.html";
  });

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    const origSetAttribute = frame.setAttribute.bind(frame);
    frame.setAttribute = function (name: string, value: string) {
      if (name.toLowerCase() === "src") {
        return;
      }
      return origSetAttribute(name, value);
    };

    const fixedSrc = frame.getAttribute("src") || initialSrc;
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return fixedSrc;
        },
        set(_val: string) {
          return;
        },
        configurable: false,
      });
    } catch (e) {}
  }, [initialSrc]);

  return (
    <div
      className="fixed inset-0 w-full overflow-hidden bg-black"
      style={{
        height: "100dvh",
        maxHeight: "-webkit-fill-available",
      }}
    >
      <iframe
        ref={iframeRef}
        key="main-thankyou-frame"
        src={initialSrc}
        title="Payment Approved"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; clipboard-write"
        data-utmify-ignore="true"
        data-utmify-ignore-iframe="true"
        style={{
          height: "100%",
          width: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
