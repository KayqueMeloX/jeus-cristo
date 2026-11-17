import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OfferCard, UpsellShell } from "@/components/upsell/UpsellShell";
import { upsellCheckoutUrl } from "@/lib/upsell-flow";

export const Route = createFileRoute("/faith-journey")({
  component: FaithJourney,
  head: () => ({
    meta: [
      { title: "Faith Daily Sanctuary — 7 Days Free" },
      { name: "description", content: "Try the Faith Daily Sanctuary app free for 7 days: morning devotionals, SOS prayers and an answered-prayer journal." },
      { property: "og:title", content: "Faith Daily Sanctuary — 7 Days Free" },
      { property: "og:description", content: "Morning devotionals, SOS prayers and an answered-prayer journal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const FEATURES = [
  { title: "Sunrise Word", text: "A verse, a short reflection and a declaration for your day — in under 5 minutes." },
  { title: "Sanctuary SOS", text: "Worry, panic, a restless night — open a ready prayer for that exact moment." },
  { title: "Answered-Prayer Journal", text: "Write each request, tap \"answered\" and watch your record of His faithfulness grow." },
  { title: "Your Private Vault", text: "Everything you own in one place, with a built-in audio player." },
];
const FAQ = [
  { q: "Will I be charged today?", a: "No. You pay $0 today. Your card is only charged $19/month after the 7 free days." },
  { q: "Do I need to download anything?", a: "No. The Sanctuary opens right in your phone's browser." },
  { q: "How do I cancel?", a: "Any time, by emailing our support. Cancel before day 7 and you pay nothing." },
];

function FaithJourney() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);
  return (
    <UpsellShell eyebrow="One last gift" title={<>Your daily <span className="text-primary">Sanctuary.</span></>}>
      <div className="mb-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-4">
            <p className="font-bold text-primary">{f.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
      <OfferCard
        price="7 days free"
        buyHref={upsellCheckoutUrl("journey", search)}
        buyLabel="Yes! Start my 7 free days ($0 today)"
        note="$0 today · then $19/month · cancel anytime before day 7 and pay nothing"
        declineLabel="No thanks, I'll walk my journey alone"
        onDecline={() => navigate({ to: "/faith-protection" })}
      />
      <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
        {FAQ.map((f) => (
          <details key={f.q} className="rounded-xl border border-border bg-card p-4">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </UpsellShell>
  );
}
