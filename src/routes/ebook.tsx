import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/ebook")({
  component: EbookRoute,
  head: () => ({
    meta: [
      { title: "Sacred Prayers E-book — My Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function EbookRoute() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    let currentSrc = frame.getAttribute("src") || "/ebook.html";
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return currentSrc;
        },
        set(val: string) {
          if (val && val.includes("ebook.html")) {
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
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#090704]">
      <iframe
        ref={iframeRef}
        key="main-ebook-frame"
        src="/ebook.html"
        title="E-book de Orações"
        className="h-full w-full border-none"
        allow="fullscreen; clipboard-write"
      />
    </div>
  );
}
