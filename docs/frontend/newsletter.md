# Newsletter

The signup form for new posts (`frontend/src/features/posts/newsletter-form.tsx`) ends every article. `/newsletter` gives it a page to share: `frontend/src/app/newsletter/page.tsx` renders that Sanity page document with the form below its intro. The form shows only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set.

## How it works

1. The form is a small client component built from ui-sdk's `Field`, `InputGroup` with `Input` and a clear button, `FieldError`, and `Button`. The heading "Get new posts by email" is the field's label. The browser validates the address with `required` and `type="email"`.
2. [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) checks the visitor for bots. The form loads Cloudflare's script with `render=explicit` and renders the widget with `appearance: "interaction-only"`, so most visitors never see it. Explicit rendering keeps the widget working after a client-side navigation to another post. The widget adds a `cf-turnstile-response` field to the form and is reset after every submit, because a token works only once.
3. The form submits to the Server Function `subscribe()` in `frontend/src/features/posts/subscribe.ts`. It rejects an invalid address or a missing token, verifies the token with Turnstile's `siteverify`, and only then calls Klaviyo's [Bulk Subscribe Profiles](https://developers.klaviyo.com/en/reference/bulk_subscribe_profiles) endpoint for the list in `KLAVIYO_LIST_ID`, with `custom_source: "kevinpierik.dev"`. Klaviyo answers `202`. The browser only sees `done` or `error`, never the reason.
4. The list has double opt-in, so Klaviyo first sends a confirmation email. A bot that gets past Turnstile never receives the newsletter.

## AI agents

The `<form>` is a declarative [WebMCP](webmcp.md) tool, `subscribe_to_newsletter`, through the `toolname` and `tooldescription` attributes and `toolparamdescription` on the input. An agent in the browser can fill in the address, but `toolautosubmit` is left off on purpose: subscribing is consent, so the person reviews the address and presses Subscribe themselves. When the agent started it, the submit handler answers it through `event.respondWith()` with the same message the page shows. Browsers without WebMCP ignore the attributes. The attributes are spread as an object because React's types don't know them yet.

The post pages stay prerendered; only the Server Function runs on Vercel when someone submits.

## No cookies

The site doesn't load `klaviyo.js`, Klaviyo's onsite script, which sets cookies to track visitors. Klaviyo only receives the address someone submits, from the server. Turnstile doesn't set tracking cookies. So the site needs no cookie banner. Adding `klaviyo.js`, an ad pixel, or other tracking would change that.

Track newsletter traffic with UTM tags on the links in each campaign (Klaviyo adds them when UTM tracking is on); Vercel Analytics shows them as referrers.

## Setting up

- **Cloudflare** → Turnstile: add a widget for `kevinpierik.dev`, `www.kevinpierik.dev`, and `localhost`, in Managed mode.
- **Klaviyo**: create the list with double opt-in, and a private API key with only `lists:write`, `profiles:write`, and `subscriptions:write`.

| Variable                         | Where  | Value                                                                   |
| -------------------------------- | ------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Turnstile site key. Locally: `1x00000000000000000000AA` (always passes) |
| `TURNSTILE_SECRET_KEY`           | Server | Turnstile secret key. Locally: `1x0000000000000000000000000000000AA`    |
| `KLAVIYO_PRIVATE_KEY`            | Server | Klaviyo private API key                                                 |
| `KLAVIYO_LIST_ID`                | Server | The id of the Klaviyo list                                              |

Set them in Vercel (Production and Preview) and in `frontend/.env.local`. The Klaviyo `revision` header is pinned in `subscribe.ts`; update it when you upgrade the API version. `subscribe.test.ts` covers the request shapes and the order of the checks. `newsletter-form.test.tsx` runs in jsdom with Testing Library and checks that an agent can find every control by name and fill in the address through ui-sdk's `createAgent`.
