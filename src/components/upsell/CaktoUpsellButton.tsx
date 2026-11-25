import { createElement, useEffect } from "react";

const SCRIPT_SRC = "https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js";

export interface CaktoUpsellButtonProps {
  /** Cakto offer short ID charged with one click. */
  offerId: string;
  /** Where the buyer goes after accepting or if the charge can't run. */
  nextUrl: string;
  label: string;
}

/** Cakto one-click upsell accept button (charges the card saved on the main purchase). */
export function CaktoUpsellButton({ offerId, nextUrl, label }: CaktoUpsellButtonProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return createElement(
    "cakto-upsell-buttons",
    null,
    createElement(
      "cakto-upsell-accept",
      {
        "bg-color": "#d4a544",
        "text-color": "#1a1206",
        "upsell-accept-url": nextUrl,
        "upsell-reject-url": nextUrl,
        "offer-id": offerId,
        "app-base-url": "https://app.cakto.com.br",
        "offer-type": "upsell",
      },
      label,
    ),
  );
}
