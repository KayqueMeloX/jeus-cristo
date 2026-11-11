import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/obrigado")({
  component: ObrigadoPage,
  head: () => ({
    meta: [
      { title: "Pagamento Aprovado — My Faith Sanctuary" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
  }),
});

function ObrigadoPage() {
  const [iframeSrc, setIframeSrc] = useState("/obrigado.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIframeSrc(`/obrigado.html${window.location.search}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src={iframeSrc}
        title="Pagamento Aprovado"
        className="h-full w-full border-none"
      />
    </div>
  );
}
