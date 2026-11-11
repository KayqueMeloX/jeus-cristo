import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/obrigado")({
  component: ObrigadoPage,
  head: () => ({
    meta: [
      { title: "Pagamento Confirmado — Santuário da Fé" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function ObrigadoPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    let currentSrc = frame.getAttribute("src") || "/obrigado.html";
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return currentSrc;
        },
        set(val: string) {
          if (val && val.includes("obrigado.html")) {
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
        key="main-obrigado-frame"
        src="/obrigado.html"
        title="Pagamento Confirmado"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; clipboard-write"
        data-utmify-ignore="true"
        data-utmify-ignore-iframe="true"
      />
    </div>
  );
}
