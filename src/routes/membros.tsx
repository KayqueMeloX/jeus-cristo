import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/membros")({
  component: MembrosView,
  head: () => ({
    meta: [
      { title: "Área de Membros | Plan Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      {
        name: "description",
        content:
          "Access your Faith & Abundance materials, prayer audios, and daily declarations.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function MembrosView() {
  const [iframeSrc, setIframeSrc] = useState("/faith-app.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/faith-app.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <iframe
        src={iframeSrc}
        title="My Faith Sanctuary - Members Area"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
