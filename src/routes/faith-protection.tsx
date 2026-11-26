import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OfferCard, UpsellShell } from "@/components/upsell/UpsellShell";
import { memberAppUrl, upsellCheckoutUrl } from "@/lib/upsell-flow";
import vslVideo from "@/assets/faith_protection_message.mp4.asset.json";
import vslCover from "@/assets/faith_protection_cover.jpg.asset.json";

/** Seconds of VSL before the offer appears (same as the reference page). */
const REVEAL_AFTER = 289;

export const Route = createFileRoute("/faith-protection")({
  component: FaithProtection,
  head: () => ({
    meta: [
      { title: "The 7 Holy Seals — Family Prayer Study" },
      { name: "description", content: "One-time offer for new members: a guided prayer study for your family's protection and peace." },
      { property: "og:title", content: "The 7 Holy Seals — Family Prayer Study" },
      { property: "og:description", content: "A guided prayer study for your family's protection and peace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function FaithProtection() {
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);
  return (
    <UpsellShell eyebrow="One final message for you" title={<>Watch this before you <span className="text-primary">enter your Sanctuary.</span></>}
      videoSrc={vslVideo.url}
      videoPoster={vslCover.url}
      revealAfter={REVEAL_AFTER}
    >
      <OfferCard
        price="$47"
        buyHref={upsellCheckoutUrl("protection", search)}
        buyLabel="Yes — add the 7 Holy Seals for $47"
        declineLabel="No thanks, take me to my Sanctuary"
        onDecline={() => { window.location.href = memberAppUrl(); }}
      >
        <p className="text-sm text-muted-foreground">Seven guided prayers, one for each day of the week, to cover your home and family with peace.</p>
      </OfferCard>
    </UpsellShell>
  );
}
