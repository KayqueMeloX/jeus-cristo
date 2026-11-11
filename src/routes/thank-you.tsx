import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Payment Approved — Welcome to My Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function ThankYouPage() {
  const [iframeSrc, setIframeSrc] = useState("/thank-you.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/thank-you.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Payment Approved"
        className="h-full w-full border-none"
      />
    </div>
  );
}
