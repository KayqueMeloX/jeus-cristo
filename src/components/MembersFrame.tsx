import { useEffect, useRef } from "react";

/**
 * Members area iframe. The UTMify script re-assigns every iframe's `src`
 * every 2 seconds to append UTMs, which reloads the app. We lock `src`
 * after the first assignment so the app stays stable.
 */
export function MembersFrame() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const initial = `/faith-app.html${window.location.search}`;
    frame.setAttribute("src", initial);
    try {
      Object.defineProperty(frame, "src", {
        get: () => initial,
        set: () => {},
        configurable: true,
      });
      const origSetAttr = frame.setAttribute.bind(frame);
      frame.setAttribute = (name: string, value: string) => {
        if (name.toLowerCase() === "src") return;
        origSetAttr(name, value);
      };
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-background">
      <iframe
        ref={ref}
        title="My Faith Sanctuary - Members Area"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
