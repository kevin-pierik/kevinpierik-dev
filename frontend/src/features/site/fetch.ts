import { cache } from "react";

import { client } from "@/features/sanity/client";

import { SETTINGS_QUERY } from "./query";

export const getSettings = cache(() => client.fetch(SETTINGS_QUERY));
