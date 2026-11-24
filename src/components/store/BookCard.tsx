import type { StoreBook } from "./catalog";

export interface BookCardProps { readonly book: StoreBook }

/** Product card with clear price, format badge and direct purchase link. */
export function BookCard({ book }: BookCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      <img src={book.cover} alt={`Cover of ${book.title}`} width={480} height={600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">PDF e-book · instant download</span>
        <h3 className="font-serif text-lg font-semibold leading-snug">{book.title}</h3>
        <p className="flex-1 text-sm text-muted-foreground">{book.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold">${book.price}<span className="ml-1 text-xs font-normal text-muted-foreground">USD · one-time</span></span>
          <a href={`/checkout?plan=${book.plan}`} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring">Buy now</a>
        </div>
      </div>
    </article>
  );
}
