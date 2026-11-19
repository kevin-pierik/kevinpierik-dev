import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import {
  getDictionary,
  languageAlternates,
  type Locale,
  otherOgLocales,
} from "@/features/i18n";
import {
  personId,
  siteName as name,
  siteUrl,
  websiteId,
} from "@/features/site";

import { blogPath, blogPaths } from "./fetch";

type PostSummary = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string | null;
};

const person = {
  "@type": "Person",
  "@id": personId,
  name,
  url: siteUrl,
} as const;
const website = { "@id": websiteId };

export function blogMetadata(locale: Locale): Metadata {
  const {
    blogTitle: title,
    blogDescription: description,
    ogLocale,
  } = getDictionary(locale);
  const path = blogPath(locale);

  return {
    title,
    description,
    authors: [{ name, url: siteUrl }],
    alternates: {
      canonical: path,
      languages: languageAlternates(blogPaths()),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: name,
      locale: ogLocale,
      alternateLocale: otherOgLocales(locale),
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function postMetadata(
  locale: Locale,
  post: PostSummary,
  alternates: Partial<Record<Locale, string>>,
): Metadata {
  const { title, description, publishedAt, updatedAt, slug } = post;
  const path = blogPath(locale, slug);
  const fullTitle = `${title} | ${name}`;

  return {
    title: fullTitle,
    description,
    authors: [{ name, url: siteUrl }],
    alternates: {
      canonical: path,
      languages: languageAlternates(alternates),
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: name,
      locale: getDictionary(locale).ogLocale,
      alternateLocale: otherOgLocales(
        locale,
        Object.keys(alternates) as Locale[],
      ),
      title,
      description,
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [siteUrl],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function blogStructuredData(
  locale: Locale,
  posts: PostSummary[],
): Graph {
  const { blogTitle, blogDescription } = getDictionary(locale);
  const url = `${siteUrl}${blogPath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: blogTitle,
        description: blogDescription,
        inLanguage: locale,
        author: person,
        publisher: person,
        isPartOf: website,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}${blogPath(locale, post.slug)}#article`,
          url: `${siteUrl}${blogPath(locale, post.slug)}`,
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          author: person,
        })),
      },
    ],
  };
}

export function postStructuredData(locale: Locale, post: PostSummary): Graph {
  const url = `${siteUrl}${blogPath(locale, post.slug)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: locale,
        author: person,
        publisher: person,
        isPartOf: website,
      },
    ],
  };
}
