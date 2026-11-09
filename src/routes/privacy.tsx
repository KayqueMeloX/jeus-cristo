import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Privacy() {
  const [iframeSrc, setIframeSrc] = useState("/privacy.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/privacy.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Privacy Policy"
        className="h-full w-full border-none"
      />
    </div>
  );
}
