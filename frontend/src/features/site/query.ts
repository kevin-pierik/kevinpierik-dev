import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_id == "settings"][0] {
    role,
    navigation[]->{
      title,
      "uri": uri.current
    }
  }
`);
