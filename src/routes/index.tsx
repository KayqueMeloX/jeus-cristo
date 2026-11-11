import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TIME TO THRIVE" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
    ],
  }),
});

function Index() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    // Trava de imutabilidade: impede scripts externos (ex: UTMify ou extensões) de reescrever o src e causar recarregamentos a cada 1 segundo
    let currentSrc = frame.getAttribute("src") || "/funnel.html";
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return currentSrc;
        },
        set(val: string) {
          if (val && (val.includes("funnel.html") || val.includes("index.html"))) {
            return; // Bloqueia tentativas de recarregar o mesmo funil
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
        key="main-funnel-frame"
        src="/funnel.html"
        title="Time to Thrive"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
        data-utmify-ignore="true"
        data-utmify-ignore-iframe="true"
      />
    </div>
  );
}
