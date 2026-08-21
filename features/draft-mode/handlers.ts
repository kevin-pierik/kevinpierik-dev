import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/features/sanity/client";
import { readToken } from "@/features/sanity/token";

const missingTokenMessage = [
  "Draft mode and the Presentation tool need SANITY_API_READ_TOKEN.",
  "",
  "Create a token with Viewer rights at https://sanity.io/manage under",
  "API > Tokens, add it to .env.local as SANITY_API_READ_TOKEN, and restart",
  "the dev server.",
].join("\n");

function missingToken() {
  return new Response(missingTokenMessage, {
    status: 500,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const enableDraftMode = readToken
  ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) })
      .GET
  : missingToken;
