import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/refund")({
  component: Refund,
  head: () => ({
    meta: [
      { title: "Refund Policy — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Refund() {
  const [iframeSrc, setIframeSrc] = useState("/refund.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/refund.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Refund Policy"
        className="h-full w-full border-none"
      />
    </div>
  );
}
