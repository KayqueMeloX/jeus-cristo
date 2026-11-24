import { createFileRoute } from "@tanstack/react-router";
import { BookCard } from "@/components/store/BookCard";
import { STORE_BOOKS } from "@/components/store/catalog";

const TITLE = "My Faith Sanctuary — Christian Devotional E-books";
const DESC = "Christian devotional e-books and prayer guides in PDF. Instant digital delivery by email, 30-day refund guarantee and friendly support.";

export const Route = createFileRoute("/")({
  component: Storefront,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://jesuscristoapp.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://jesuscristoapp.com/" }],
  }),
});

const STEPS = [
  { t: "1. Choose your e-book", d: "Pick a title and pay securely. Every price is a one-time payment in USD — no subscription." },
  { t: "2. Instant download", d: "Right after payment you get a download page with your PDF. No account or password needed." },
  { t: "3. Copy by email", d: "A permanent download link is also emailed to you within minutes, so you can read on any device." },
];

function Storefront() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4" aria-label="Main">
          <a href="/" className="flex items-center gap-2 font-serif text-lg font-semibold"><img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded" />My Faith Sanctuary</a>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#catalog" className="hover:text-foreground">Catalog</a>
            <a href="/support" className="hover:text-foreground">Support</a>
            <a href="/faith-app" className="hover:text-foreground">Members Area</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
          <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">Christian devotional publishing</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">Prayer guides and devotional e-books, delivered instantly</h1>
          <p className="mt-5 text-lg text-muted-foreground">Carefully written PDF guides with daily prayers, Psalms and Bible reflections. Download right after purchase and keep them forever.</p>
          <a href="#catalog" className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">Browse the catalog</a>
        </section>

        <section id="catalog" className="mx-auto max-w-6xl px-5 pb-16" aria-labelledby="catalog-title">
          <h2 id="catalog-title" className="mb-8 font-serif text-3xl font-semibold">Catalog</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STORE_BOOKS.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="mb-8 font-serif text-3xl font-semibold">How digital delivery works</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.t} className="rounded-xl border border-border bg-card p-6"><h3 className="mb-2 font-semibold">{s.t}</h3><p className="text-sm text-muted-foreground">{s.d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-16 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 font-serif text-2xl font-semibold">30-day refund guarantee</h2>
            <p className="text-sm text-muted-foreground">If an e-book is not right for you, request a full refund within 30 days of purchase. No questions asked. See our <a href="/refund" className="underline">refund policy</a>.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 font-serif text-2xl font-semibold">Customer support</h2>
            <p className="text-sm text-muted-foreground">Questions about an order or download? Write to us through the <a href="/support" className="underline">support page</a> and we reply by email within 24 hours.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 My Faith Sanctuary. Digital products only — nothing is shipped.</p>
          <nav className="flex flex-wrap gap-4" aria-label="Legal">
            <a href="/terms" className="hover:text-foreground">Terms</a>
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/refund" className="hover:text-foreground">Refunds</a>
            <a href="/support" className="hover:text-foreground">Support</a>
            <a href="/imprint" className="hover:text-foreground">Imprint</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
