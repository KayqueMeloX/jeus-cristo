import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const META_PIXEL_ID = "29015918781408333";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "TIME TO THRIVE" },
      { name: "description", content: "TIME TO THRIVE" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />

        {/* Permanent CSS removal of Lovable badge / watermark */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #lovable-badge,
              #lovable-badge-cta,
              #lovable-badge-logo,
              #lovable-badge-text,
              #lovable-badge-divider,
              #lovable-badge-close,
              [id*="lovable-badge"],
              [id*="lovable"],
              [class*="lovable-badge"],
              [class*="lovable"],
              [aria-label*="Lovable" i],
              [aria-label*="Edit with" i],
              [title*="Lovable" i],
              [title*="Edit with" i],
              a[href*="lovable.dev"],
              a[href*="lovable.app"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                top: -9999px !important;
                left: -9999px !important;
                width: 0 !important;
                height: 0 !important;
                max-width: 0 !important;
                max-height: 0 !important;
                clip: rect(0, 0, 0, 0) !important;
                clip-path: inset(100%) !important;
                transform: scale(0) !important;
                z-index: -99999 !important;
              }
            `,
          }}
        />

        {/* Runtime script: permanently purge Lovable badge DOM element */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function purgeLovable() {
                  try {
                    var els = document.querySelectorAll('#lovable-badge, [id*="lovable-badge"], [class*="lovable-badge"], [aria-label*="Lovable" i], [aria-label*="Edit with" i], a[href*="lovable.dev"], a[href*="lovable.app"]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].remove();
                    }
                  } catch(e) {}
                }
                purgeLovable();
                if (typeof window !== 'undefined') {
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', purgeLovable);
                  }
                  window.addEventListener('load', purgeLovable);
                  if (window.MutationObserver) {
                    new MutationObserver(purgeLovable).observe(document.documentElement, {
                      childList: true,
                      subtree: true
                    });
                  }
                  setInterval(purgeLovable, 250);
                }
              })();
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
              (function(){
  var _orig = window.fbq;
  var allowed = '29015918781408333';
  window.fbq = function(){
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
      if (String(args[i]).indexOf('1328178869180593') !== -1) {
        return;
      }
    }
    if (args[0] === 'init' && args[1] !== allowed) {
      return;
    }
    if ((args[0] === 'trackSingle' || args[0] === 'trackSingleCustom') && args[1] !== allowed) {
      return;
    }
    return _orig.apply(this, args);
  };
  for(var p in _orig){
    if(Object.prototype.hasOwnProperty.call(_orig, p)){
      window.fbq[p] = _orig[p];
    }
  }
})();
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var el = document.getElementById('lovable-badge');
                if (el) el.remove();
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
