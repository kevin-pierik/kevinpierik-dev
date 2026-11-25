# WebMCP

[WebMCP](https://webmachinelearning.github.io/webmcp/) lets a page offer tools to an AI agent running in the browser. It is a W3C Community Group draft; Chrome ships it behind a flag and in an origin trial from Chrome 149.

`frontend/src/features/site/webmcp.tsx` is a client component rendered once in `frontend/src/app/layout.tsx`. On load it registers five tools with `document.modelContext.registerTool()`, falling back to the older, deprecated `navigator.modelContext`. Browsers without WebMCP skip it. The tools are removed through an `AbortController` when the component unmounts, and the fetches in `get_post` and `get_page` follow the signal WebMCP passes to `execute`, so a cancelled call stops its request.

- `list_posts`: the posts from `getArticles()`, passed in by the layout at build time.
- `get_post`: the Markdown of one post, fetched from `/posts/<slug>/md` (see [llms.txt and Markdown](llms-txt.md)). The slug must be one of the listed posts.
- `get_page`: the Markdown of one page, such as the homepage with the About me and Projects sections. The layout passes the URIs from `getPageUris()`, the same pages `/llms-full.txt` holds, as the `uri` enum. The tool fetches `/llms-full.txt` only when called and picks the document whose `URL:` line is the page's canonical URL (`pageMarkdown()`), so the page text never ships in the bundle and no extra Markdown route is needed. If the `llms-full.txt` format changes, update `pageMarkdown()` and its test with it.
- `get_contact`: the email address and profile links from `frontend/src/features/site/social-links.ts`, so profile changes there reach the tool too.
- `draft_email`: opens a `mailto:` link to the contact address with the subject and message the agent passes, so the visitor's mail app opens a draft. It sends nothing; the visitor reviews and sends it. `mailtoUrl()` encodes with `encodeURIComponent`, because `URLSearchParams` writes spaces as `+`, which mail apps show literally.

The first four are marked `readOnlyHint: true`; `draft_email` is not, because it leaves the page.

### Not added

Each tool should do something an agent can't already do with `/llms.txt` or the page itself.

- `list_pages`: the `uri` enum of `get_page` already lists the pages.
- `list_projects`: projects are a section of a page, so `get_page` returns them.
- `search_posts`: `list_posts` returns every title and description, which the agent can search itself. Reconsider when there are dozens of posts.

## Origin trial

Outside the flag, WebMCP needs an origin trial token for `www.kevinpierik.dev` from [Chrome Origin Trials](https://developer.chrome.com/origintrials). Set it as `NEXT_PUBLIC_WEBMCP_TRIAL_TOKEN`; the layout then renders `<meta http-equiv="origin-trial">`. Without it the tools only register with `chrome://flags/#enable-webmcp-testing` turned on.

## Testing

Turn on the flag, open the site, and inspect the tools with the Model Context Tool Inspector extension. From the terminal, `bunx agent-browser open <url>` announces the tools, `bunx agent-browser webmcp list --json` shows their schemas, and `bunx agent-browser webmcp invoke get_page '{"uri":"/"}'` calls one. `pageMarkdown()` and `mailtoUrl()` have unit tests in `webmcp.test.ts`.
