import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/support")({
  component: Support,
  head: () => ({
    meta: [
      { title: "Customer Support — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Support() {
  const [iframeSrc, setIframeSrc] = useState("/support.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/support.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Customer Support"
        className="h-full w-full border-none"
      />
    </div>
  );
}
