import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/pay")({
  component: PaySlug,
  head: () => ({
    meta: [
      { title: "Secure Checkout — FAKKO SOLUTIONS LLC" },
      { name: "referrer", content: "no-referrer" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function PaySlug() {
  const [iframeSrc, setIframeSrc] = useState("/pay.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/pay.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Secure Checkout"
        className="h-full w-full border-none"
        allow="payment"
      />
    </div>
  );
}
