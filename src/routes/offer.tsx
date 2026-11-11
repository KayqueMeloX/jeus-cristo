import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/offer")({
  component: Offer,
  head: () => ({
    meta: [
      { title: "Your Divine Manifestation Script — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

export function Offer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [initialSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return `/offer.html${window.location.search}`;
    }
    return "/offer.html";
  });

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    // 1. Interceptar e anular qualquer chamada de setAttribute('src', ...)
    const origSetAttribute = frame.setAttribute.bind(frame);
    frame.setAttribute = function (name: string, value: string) {
      if (name.toLowerCase() === "src") {
        return;
      }
      return origSetAttribute(name, value);
    };

    // 2. Trava absoluta de propriedade no elemento
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
        key="main-offer-frame"
        src={initialSrc}
        title="Plan Faith Offer"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; payment"
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
