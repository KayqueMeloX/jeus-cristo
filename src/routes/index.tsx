import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TIME TO THRIVE" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
    ],
  }),
});

function Index() {
  const [iframeSrc, setIframeSrc] = useState("/index.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/index.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Time to Thrive"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
