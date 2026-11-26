<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Quiz delivery
- Keep `public/funnel.html` and `public/index.html` identical whenever changing the static quiz so alternate entry paths share the same experience.

## Checkout configuration
- Keep payment destinations in `src/lib/checkout-links.ts` and test each supplied mapping independently so similarly priced tiers and upsells cannot be confused.

## Mundpay purchase seal
- Load the supplied Mundpay seal from `public/mundpay-sticker.js` in the root shell and both static quiz entries; skip duplicate initialization inside the quiz iframe so only one seal and legal footer appear.

## Mundpay sales webhook
- Mundpay postbacks: enforce `?token=` only when `MUNDPAY_WEBHOOK_SECRET` is set (Mundpay has no signing field); otherwise rely on strict payload validation. UTMify gets sales from Mundpay native integration, so the webhook never sends to UTMify (avoids duplicates).
- Read Meta CAPI credentials from server secrets during dispatch, including the managed Meta connection, so no private token is embedded in the client-reachable module.
- Mundpay products are identified by name before price, because several products share $47; each paid order emails every product it contains (order bumps included).
