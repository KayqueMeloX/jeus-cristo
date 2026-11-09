import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Plan Faith" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function Terms() {
  const [iframeSrc, setIframeSrc] = useState("/terms.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/terms.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Terms and Conditions"
        className="h-full w-full border-none"
      />
    </div>
  );
}
