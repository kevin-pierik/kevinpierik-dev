import { defineLive } from "next-sanity/live";

import { client } from "@/features/sanity/client";
import { readToken } from "@/features/sanity/token";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
});
