import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import {
  sanityApiVersion,
  sanityClientProjectId,
  sanityDataset,
} from "./env";
import { studioBasePath } from "./features/sanity/constants";
import { locations, mainDocuments } from "./sanity/presentation";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const singletons = new Set(["settings"]);

export default defineConfig({
  name: "kevinpierik",
  title: "kevinpierik.dev",
  basePath: studioBasePath,
  projectId: sanityClientProjectId,
  dataset: sanityDataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((template) => !singletons.has(template.id)),
      {
        id: "desktopWindow-by-placement",
        title: "Window in this placement",
        schemaType: "desktopWindow",
        parameters: [{ name: "placement", type: "string" }],
        value: ({ placement }: { placement: string }) => ({ placement }),
      },
    ],
  },
  document: {
    actions: (actions, context) =>
      singletons.has(context.schemaType)
        ? actions.filter(
            ({ action }) =>
              action && !["unpublish", "delete", "duplicate"].includes(action),
          )
        : actions,
    newDocumentOptions: (items) =>
      items.filter((item) => !singletons.has(item.templateId)),
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: { mainDocuments, locations },
    }),
    visionTool({ defaultApiVersion: sanityApiVersion }),
  ],
});
