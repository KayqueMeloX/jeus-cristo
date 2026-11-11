import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  // Set once on mount to prevent any iframe reloads or restarts
  const [iframeSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return `/funnel.html${window.location.search}`;
    }
    return "/funnel.html";
  });

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
