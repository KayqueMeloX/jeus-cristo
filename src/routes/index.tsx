import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TIME TO THRIVE" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
    ],
  }),
});

export function Index() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [initialSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return `/funnel.html${window.location.search}`;
    }
    return "/funnel.html";
  });

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    // 1. Interceptar e anular qualquer chamada de setAttribute('src', ...)
    const origSetAttribute = frame.setAttribute.bind(frame);
    frame.setAttribute = function (name: string, value: string) {
      if (name.toLowerCase() === "src") {
        return; // Imutável: nunca reescreve o src
      }
      return origSetAttribute(name, value);
    };

    // 2. Trava absoluta de propriedade no elemento: descarta atribuições como frame.src = ...
    const fixedSrc = frame.getAttribute("src") || initialSrc;
    try {
      Object.defineProperty(frame, "src", {
        get() {
          return fixedSrc;
        },
        set(_val: string) {
          // Bloqueia qualquer tentativa de recarregamento
          return;
        },
        configurable: false,
      });
    } catch (e) {}

    // 3. Trava global para protótipo de iframe com tag de ignore
    try {
      const origProtoSet = HTMLIFrameElement.prototype.setAttribute;
      HTMLIFrameElement.prototype.setAttribute = function (name: string, value: string) {
        if (
          name.toLowerCase() === "src" &&
          (this.getAttribute("data-utmify-ignore") === "true" ||
            this.getAttribute("data-utmify-ignore-iframe") === "true")
        ) {
          return;
        }
        return origProtoSet.apply(this, arguments as any);
      };
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
        key="main-funnel-frame"
        src={initialSrc}
        title="Time to Thrive"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
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
