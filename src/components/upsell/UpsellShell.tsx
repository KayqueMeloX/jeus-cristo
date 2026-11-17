import { useEffect, useState, type ReactNode } from "react";
import { VslPlayer } from "./VslPlayer";
import { rememberPurchase } from "@/lib/upsell-flow";

export interface UpsellShellProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional VSL (mp4/hosted video URL). Without it the offer shows immediately. */
  videoSrc?: string;
  videoPoster?: string;
  /** Seconds of video before the offer appears. */
  revealAfter?: number;
  children: ReactNode;
}

/** Shared layout for upsell pages: warning bar, headline, optional VSL with timed offer reveal. */
export function UpsellShell({ eyebrow, title, videoSrc, videoPoster, revealAfter = 0, children }: UpsellShellProps) {
  const [revealed, setRevealed] = useState(!videoSrc || revealAfter <= 0);

  useEffect(() => { rememberPurchase(window.location.search); }, []);

  return (
    <div className="theme-sanctuary min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">
        ⚠ Do not close this page or press the back button. Your spiritual journey is not yet complete.
      </div>
      <main className="mx-auto max-w-2xl px-4 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
        {videoSrc && (
          <VslPlayer src={videoSrc} poster={videoPoster} onProgress={(t) => { if (!revealed && t >= revealAfter) setRevealed(true); }} />
        )}
        <div className="mt-8">
          {revealed ? children : (
            <p className="text-sm text-muted-foreground">Keep watching — your next step will appear below the video.</p>
          )}
        </div>
      </main>
      <footer className="pb-8 text-center text-xs text-muted-foreground">
        Digital product · Instant access in your member area and by email.
      </footer>
    </div>
  );
}

export interface OfferCardProps {
  price: string;
  regularPrice?: string;
  buyHref: string;
  buyLabel: string;
  note?: string;
  declineLabel: string;
  onDecline: () => void;
  children?: ReactNode;
}

/** Price box with buy button and "no thanks" link. */
export function OfferCard({ price, regularPrice, buyHref, buyLabel, note, declineLabel, onDecline, children }: OfferCardProps) {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border-2 border-primary bg-card p-6">
      {children}
      {regularPrice && (
        <p className="text-muted-foreground">Regular price <span className="line-through">{regularPrice}</span></p>
      )}
      <p className="text-5xl font-bold text-primary">{price}</p>
      <a href={buyHref} className="block w-full rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-lg transition-opacity hover:opacity-90">
        {buyLabel}
      </a>
      <p className="text-xs text-muted-foreground">{note ?? "Instant digital access · Secure checkout · 7-day money-back guarantee"}</p>
      <button type="button" onClick={onDecline} className="text-xs text-muted-foreground underline underline-offset-4">
        {declineLabel}
      </button>
    </div>
  );
}
