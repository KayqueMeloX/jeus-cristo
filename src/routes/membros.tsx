import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/membros")({
  component: MembrosView,
  head: () => ({
    meta: [
      { title: "Área de Membros - Bible App" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function MembrosView() {
  const [iframeSrc, setIframeSrc] = useState("/membros.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/membros.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0b0b0c]">
      <iframe
        src={iframeSrc}
        title="Área de Membros Bible App"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
