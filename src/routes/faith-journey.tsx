import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OfferCard, UpsellShell } from "@/components/upsell/UpsellShell";
import { upsellCheckoutUrl } from "@/lib/upsell-flow";
import vslVideo from "@/assets/faith_journey_message.mp4.asset.json";
import vslCover from "@/assets/faith_journey_cover.jpg.asset.json";
import phoneImg from "@/assets/faith_sanctuary_phone.jpg.asset.json";

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

/** Seconds of VSL before the offer appears (same as the reference page). */
const REVEAL_AFTER = 392;

const FEATURES = [
  { title: "Sunrise Word", text: "A verse, a short reflection and a declaration to speak over your day — in under 5 minutes." },
  { title: "Sanctuary SOS", text: "Worry, panic, lost hope, a restless night — open a ready prayer for that exact moment." },
  { title: "Answered-Prayer Journal", text: "Write each request, tap \"answered\" when God moves, and watch your record of His faithfulness grow." },
  { title: "Your Private Vault", text: "Your guidance and every plan you unlock, with a built-in audio player." },
];
const ALONE = ["The habit fades after 3–4 busy mornings", "Anxiety wins the late-night battles", "Your materials get lost in your inbox", "No record of how God has answered you"];
const WITH = ["5 quiet minutes ready every morning", "An SOS prayer in your pocket for hard moments", "Everything you own in one place", "A growing journal of answered prayers"];
const FAQ = [
  { q: "Will I be charged today?", a: "No. You pay $0 today. Your card is only charged $19/month after the 7 free days." },
  { q: "Do I need to download anything?", a: "No. The Sanctuary opens right in your phone's browser." },
  { q: "How do I cancel?", a: "Any time, by emailing our support. Cancel before day 7 and you pay nothing." },
  { q: "Is this different from my 90-Day Plan?", a: "Yes. The plan is a guide you download. The Sanctuary is a daily companion." },
];

function FaithJourney() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);
  const offer = (
    <OfferCard
      price="7 days free"
      buyHref={upsellCheckoutUrl("journey", search)}
      buyLabel="Yes! Start my 7 free days ($0 today)"
      note="$0 today · then $19/month · cancel anytime before day 7 and pay nothing"
      declineLabel="No thanks, I'll walk my journey alone"
      onDecline={() => navigate({ to: "/faith-protection" })}
    />
  );
  return (
    <UpsellShell
      eyebrow="One last gift"
      title={<>One last gift: <span className="text-primary">your daily Sanctuary.</span></>}
      videoSrc={vslVideo.url}
      videoPoster={vslCover.url}
      revealAfter={REVEAL_AFTER}
    >
      <div className="space-y-10">
        <img src={phoneImg.url} alt="Faith Daily Sanctuary app on a phone" width={420} height={420} className="mx-auto w-full max-w-sm rounded-2xl border-2 border-primary" />
        {offer}
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold text-primary">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
          <ul className="space-y-2 rounded-xl border border-border bg-card p-5">
            <li className="font-bold">Walking alone</li>
            {ALONE.map((t) => <li key={t} className="flex gap-2 text-sm"><span className="text-destructive">✕</span>{t}</li>)}
          </ul>
          <ul className="space-y-2 rounded-xl border-2 border-primary bg-card p-5">
            <li className="font-bold text-primary">With the Sanctuary</li>
            {WITH.map((t) => <li key={t} className="flex gap-2 text-sm"><span className="text-primary">✓</span>{t}</li>)}
          </ul>
        </div>
        <dl className="space-y-4 text-left">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-4">
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
        {offer}
      </div>
    </UpsellShell>
  );
}
