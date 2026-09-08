import { Studio } from "sanity";

import config from "../../../sanity.config";

export function SanityStudio() {
  return <Studio config={config} />;
}
