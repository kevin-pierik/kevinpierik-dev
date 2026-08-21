import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  { route: "/", filter: '_type == "desktopWindow" && placement == "home"' },
  {
    route: "/extra/:slug",
    filter: '_type == "desktopWindow" && slug.current == $slug',
  },
  { route: "/blog/:slug", filter: '_type == "post" && slug.current == $slug' },
  {
    route: "/:slug",
    filter: '_type == "desktopWindow" && placement == "standalone" && slug.current == $slug',
  },
]);

const homeLocation = { title: "Home", href: "/" };

export const locations = {
  settings: defineLocations({
    message: "This document is used on every screen.",
    tone: "positive",
    locations: [homeLocation],
  }),
  desktopWindow: defineLocations({
    select: { label: "label", slug: "slug.current", placement: "placement" },
    resolve: (doc) => {
      if (doc?.placement === "standalone") {
        return {
          locations: [{ title: doc.label ?? "Untitled", href: `/${doc.slug}` }],
        };
      }

      if (doc?.placement === "project") {
        return {
          locations: [
            { title: doc.label ?? "Untitled", href: `/extra/${doc.slug}` },
            { title: "Extra", href: "/extra" },
          ],
        };
      }

      return { locations: [homeLocation] };
    },
  }),
  post: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title ?? "Untitled", href: `/blog/${doc?.slug}` },
        { title: "Blog", href: "/blog" },
      ],
    }),
  }),
};
