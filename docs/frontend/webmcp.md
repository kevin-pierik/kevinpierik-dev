# WebMCP

[WebMCP](https://webmachinelearning.github.io/webmcp/) lets a page offer tools to an AI agent running in the browser. It is a W3C Community Group draft; Chrome ships it behind a flag and in an origin trial from Chrome 149.

`frontend/src/features/site/webmcp.tsx` is a client component rendered once in `frontend/src/app/layout.tsx`. On load it registers three read-only tools with `document.modelContext.registerTool()`, falling back to the older, deprecated `navigator.modelContext`. Browsers without WebMCP skip it. The tools are removed through an `AbortController` when the component unmounts.

- `list_posts`: the posts from `getArticles()`, passed in by the layout at build time.
- `get_post`: the Markdown of one post, fetched from `/posts/<slug>/md` (see [llms.txt and Markdown](llms-txt.md)). The slug must be one of the listed posts.
- `get_contact`: the email address and profile links from `frontend/src/features/site/social-links.ts`, so profile changes there reach the tool too.

The [newsletter form](newsletter.md#ai-agents) under each post is a fourth tool, declared on the `<form>` itself instead of registered here.

## Origin trial

Outside the flag, WebMCP needs an origin trial token for `www.kevinpierik.dev` from [Chrome Origin Trials](https://developer.chrome.com/origintrials). Set it as `NEXT_PUBLIC_WEBMCP_TRIAL_TOKEN`; the layout then renders `<meta http-equiv="origin-trial">`. Without it the tools only register with `chrome://flags/#enable-webmcp-testing` turned on.

## Testing

Turn on the flag, open the site, and inspect the tools with the Model Context Tool Inspector extension.
