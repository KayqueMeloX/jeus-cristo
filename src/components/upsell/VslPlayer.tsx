import { useRef, useState } from "react";

export interface VslPlayerProps {
  src: string;
  poster?: string | undefined;
  /** Called on every time update with the current second. */
  onProgress?: (seconds: number) => void;
}

/**
 * VTurb-style sales video: autoplays muted, no seek controls, a big
 * "click to listen" overlay that restarts with sound, and a smooth fake progress bar.
 */
export function VslPlayer({ src, poster, onProgress }: VslPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pct, setPct] = useState(0);

  const unmute = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    void v.play();
  };
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { void v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
  };

  return (
    <div className="relative mx-auto mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-card shadow-2xl">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onClick={muted ? unmute : toggle}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          onProgress?.(v.currentTime);
          // Fast-start curve: the bar looks quicker early on, like VTurb.
          if (v.duration) setPct(Math.sqrt(v.currentTime / v.duration) * 100);
        }}
        className="h-full w-full cursor-pointer object-cover"
      />
      {muted && (
        <button type="button" onClick={unmute} aria-label="Your video has started. Click to listen with sound" className="absolute inset-0 flex items-center justify-center bg-background/40 p-4">
          <span className="flex max-w-[260px] animate-pulse flex-col items-center gap-2 rounded-2xl bg-primary px-5 py-4 font-bold text-primary-foreground shadow-2xl">
            <span className="text-sm">Your video has already started</span>
            <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" /></svg>
            <span className="text-sm">Click to listen</span>
          </span>
        </button>
      )}
      {!muted && paused && (
        <button type="button" onClick={toggle} aria-label="Resume video" className="absolute inset-0 flex items-center justify-center bg-background/40">
          <span className="rounded-full bg-primary p-5 text-primary-foreground shadow-2xl">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-background/30" aria-hidden="true">
        <div className="h-full bg-primary transition-[width] duration-500 ease-linear" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
