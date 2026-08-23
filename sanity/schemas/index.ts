import type { SchemaTypeDefinition } from "sanity";

import { desktopWindow } from "./documents/desktop-window";
import { post } from "./documents/post";
import { articleText } from "./objects/article-text";
import { codeBlock } from "./objects/code-block";
import { detail } from "./objects/detail";
import { entryList } from "./objects/entry-list";
import { labelledLink } from "./objects/labelled-link";
import { link } from "./objects/link";
import { linkRow } from "./objects/link-row";
import { seo } from "./objects/seo";
import { windowText } from "./objects/window-text";
import { settings } from "./documents/site-settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  settings,
  desktopWindow,
  post,
  articleText,
  windowText,
  codeBlock,
  detail,
  entryList,
  labelledLink,
  link,
  linkRow,
  seo,
];
