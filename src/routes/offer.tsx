import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/offer")({
  component: Offer,
  head: () => ({
    meta: [
      { title: "Your Divine Manifestation Script — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Offer() {
  const [iframeSrc, setIframeSrc] = useState("/offer.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/offer.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Plan Faith Offer"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
