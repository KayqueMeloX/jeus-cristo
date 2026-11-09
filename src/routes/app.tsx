import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app")({
  component: AppView,
  head: () => ({
    meta: [
      { title: "Bible App - Daily Scripture, Plans & Audio | Horizon" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function AppView() {
  const [iframeSrc, setIframeSrc] = useState("/app.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/app.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0b0b0c]">
      <iframe
        src={iframeSrc}
        title="Bible App"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
