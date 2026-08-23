import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  { route: "/", filter: '_type == "desktopWindow" && placement == "home"' },
  {
    route: "/works/:slug",
    filter: '_type == "desktopWindow" && slug.current == $slug',
  },
  { route: "/words/:slug", filter: '_type == "post" && slug.current == $slug' },
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
            { title: doc.label ?? "Untitled", href: `/works/${doc.slug}` },
            { title: "Works", href: "/works" },
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
        { title: doc?.title ?? "Untitled", href: `/words/${doc?.slug}` },
        { title: "Words", href: "/words" },
      ],
    }),
  }),
};
