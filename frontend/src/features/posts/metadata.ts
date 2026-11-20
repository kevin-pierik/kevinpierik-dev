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

import { postsPath, postsPaths } from "./fetch";

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

export function postsMetadata(locale: Locale): Metadata {
  const {
    postsTitle: title,
    postsDescription: description,
    ogLocale,
  } = getDictionary(locale);
  const path = postsPath(locale);

  return {
    title,
    description,
    authors: [{ name, url: siteUrl }],
    alternates: {
      canonical: path,
      languages: languageAlternates(postsPaths()),
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
  const path = postsPath(locale, slug);
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

export function postsStructuredData(
  locale: Locale,
  posts: PostSummary[],
): Graph {
  const { postsTitle, postsDescription } = getDictionary(locale);
  const url = `${siteUrl}${postsPath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#posts`,
        url,
        name: postsTitle,
        description: postsDescription,
        inLanguage: locale,
        author: person,
        publisher: person,
        isPartOf: website,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}${postsPath(locale, post.slug)}#article`,
          url: `${siteUrl}${postsPath(locale, post.slug)}`,
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
  const url = `${siteUrl}${postsPath(locale, post.slug)}`;

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
