import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { FolderIcon } from "@sanity/icons/Folder";
import { LinkIcon } from "@sanity/icons/Link";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { SETTINGS_ID } from "./schemas/documents/site-settings";

type Placement = {
  title: string;
  value: string;
  icon: typeof DocumentIcon;
};

function placementList(S: StructureBuilder, { title, value, icon }: Placement) {
  return S.listItem()
    .id(value)
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .id(value)
        .title(title)
        .filter('_type == "desktopWindow" && placement == $placement')
        .params({ placement: value })
        .defaultOrdering([{ field: "order", direction: "asc" }])
        .initialValueTemplates([
          S.initialValueTemplateItem("desktopWindow-by-placement", {
            placement: value,
          }),
        ]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.listItem()
        .id("settings")
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("settings").documentId(SETTINGS_ID)),
      S.divider(),
      placementList(S, { title: "Home", value: "home", icon: DocumentIcon }),
      S.documentTypeListItem("post").title("Words").icon(DocumentTextIcon),
      placementList(S, { title: "Works", value: "project", icon: FolderIcon }),
      placementList(S, {
        title: "Pages",
        value: "standalone",
        icon: DocumentsIcon,
      }),
      S.divider(),
      placementList(S, {
        title: "Corner links",
        value: "corner",
        icon: LinkIcon,
      }),
    ]);
