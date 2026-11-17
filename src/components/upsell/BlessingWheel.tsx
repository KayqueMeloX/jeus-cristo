import { useState } from "react";

const SLICES = ["50% OFF", "10% OFF", "Try again", "20% OFF", "Free prayer", "30% OFF"] as const;
const DEG = 360 / SLICES.length;

export interface BlessingWheelProps {
  open: boolean;
  buyHref: string;
  onDecline: () => void;
}

/** Downsell modal: one spin always lands on 50% OFF and unlocks the $47 plan. */
export function BlessingWheel({ open, buyHref, onDecline }: BlessingWheelProps) {
  const [rot, setRot] = useState(0);
  const [state, setState] = useState<"idle" | "spinning" | "won">("idle");
  if (!open) return null;

  const spin = () => {
    if (state !== "idle") return;
    setRot(1800 - DEG / 2);
    setState("spinning");
    window.setTimeout(() => setState("won"), 4200);
  };
  const bg = SLICES.map((_, i) => `${i % 2 === 0 ? "var(--primary)" : "var(--card)"} ${i * DEG}deg ${(i + 1) * DEG}deg`).join(", ");

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-card p-6 text-center shadow-2xl">
        <h2 className="text-2xl font-bold">{state === "won" ? "You won 50% OFF!" : "Wait — one gift before you go"}</h2>
        <p className="text-sm text-muted-foreground">
          {state === "won"
            ? "Your 90-Day Activation Plan is now $47 instead of $97."
            : "Spin the blessing wheel once to unlock a special discount for new members."}
        </p>
        {state === "won" ? (
          <div className="space-y-4">
            <a href={buyHref} className="block w-full rounded-xl bg-primary px-5 py-4 font-bold text-primary-foreground">Claim my plan for $47</a>
            <button type="button" onClick={onDecline} className="text-xs text-muted-foreground underline underline-offset-4">
              No thanks, I'll give up my 50% discount
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-64 w-64">
              <div className="absolute -top-1 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[20px] border-x-transparent border-t-foreground" aria-hidden />
              <div
                className="relative h-full w-full rounded-full border-4 border-primary shadow-xl transition-transform duration-[4000ms] ease-out"
                style={{ background: `conic-gradient(${bg})`, transform: `rotate(${rot}deg)` }}
                aria-hidden
              >
                {SLICES.map((s, i) => (
                  <span key={s} className="absolute left-1/2 top-1/2 text-xs font-bold text-foreground"
                    style={{ transform: `rotate(${i * DEG + DEG / 2}deg) translateY(-92px) translateX(-50%)`, transformOrigin: "0 0" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <button type="button" onClick={spin} disabled={state === "spinning"} className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-60">
              {state === "spinning" ? "Spinning…" : "Spin the wheel"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
