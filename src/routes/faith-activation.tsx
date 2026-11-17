import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OfferCard, UpsellShell } from "@/components/upsell/UpsellShell";
import { BlessingWheel } from "@/components/upsell/BlessingWheel";
import { upsellCheckoutUrl } from "@/lib/upsell-flow";

export const Route = createFileRoute("/faith-activation")({
  component: FaithActivation,
  head: () => ({
    meta: [
      { title: "Your 90-Day Faith & Abundance Activation Plan" },
      { name: "description", content: "One-time offer for new members: a guided 90-day daily path of prayer, scripture and declarations." },
      { property: "og:title", content: "Your 90-Day Faith & Abundance Activation Plan" },
      { property: "og:description", content: "A guided 90-day daily path of prayer, scripture and declarations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const INCLUDES = [
  "90 days of guided morning prayers",
  "A daily scripture and reflection",
  "Spoken declarations for each week",
  "Printable 90-day progress tracker",
];

function FaithActivation() {
  const navigate = useNavigate();
  const [wheel, setWheel] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);

  return (
    <UpsellShell
      eyebrow="A private message for you"
      title={<>Watch this short message from the Archangel <span className="text-primary">before you continue.</span></>}
      videoSrc="https://cdn.converteai.net/85233a33-7dd7-47f0-a1c8-356935a092df/6ae4ee353ce680b34e9f0d2f/main.m3u8"
      videoPoster="https://images.converteai.net/85233a33-7dd7-47f0-a1c8-356935a092df/players/6ae4ee3ba1db2408a3683ffe/cover.jpg"
      revealAfter={221}
    >
      <OfferCard
        regularPrice="$197"
        price="$97"
        buyHref={upsellCheckoutUrl("activation", search)}
        buyLabel="Yes — add my 90-Day Activation Plan for $97"
        declineLabel="No thanks, I'll try to apply my Blueprint on my own"
        onDecline={() => setWheel(true)}
      >
        <ul className="space-y-2 text-left text-sm">
          {INCLUDES.map((i) => <li key={i}>✓ {i}</li>)}
        </ul>
      </OfferCard>
      <BlessingWheel open={wheel} buyHref={upsellCheckoutUrl("activationDiscount", search)} onDecline={() => navigate({ to: "/faith-journey" })} />
    </UpsellShell>
  );
}
