import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/entregavel")({
  component: EntregavelView,
  head: () => ({
    meta: [
      { title: "Entregável - Bible App" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function EntregavelView() {
  const [iframeSrc, setIframeSrc] = useState("/entregavel.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/entregavel.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0b0b0c]">
      <iframe
        src={iframeSrc}
        title="Entregável Bible App"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
