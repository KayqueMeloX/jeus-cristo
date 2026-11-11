import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        key="main-offer-frame"
        src="/offer.html"
        title="Plan Faith Offer"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; payment"
      />
    </div>
  );
}
