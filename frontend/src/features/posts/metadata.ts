import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import {
  personId,
  siteName as name,
  siteUrl,
  websiteId,
} from "@/features/site";

import { postsPath } from "./fetch";

type PostSummary = {
  title: string;
  slug: string;
  description: string;
  seo?: { title?: string | null; description?: string | null } | null;
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

export function postMetadata(post: PostSummary): Metadata {
  const { title, description, publishedAt, updatedAt, slug } = post;
  const seoTitle = post.seo?.title ?? `${title} | ${name}`;
  const seoDescription = post.seo?.description ?? description;
  const path = postsPath(slug);

  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name, url: siteUrl }],
    alternates: {
      canonical: path,
      types: { "text/markdown": `${path}/md` },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: name,
      locale: "en_US",
      title: seoTitle,
      description: seoDescription,
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [siteUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

type PostsPage = {
  title: string;
  uri: string;
  seo: { title?: string | null; description?: string | null } | null;
};

export function postsStructuredData(
  page: PostsPage,
  posts: PostSummary[],
): Graph {
  const url = `${siteUrl}${page.uri}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#posts`,
        url,
        name: page.seo?.title ?? page.title,
        description: page.seo?.description ?? undefined,
        inLanguage: "en",
        author: person,
        publisher: person,
        isPartOf: website,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}${postsPath(post.slug)}#article`,
          url: `${siteUrl}${postsPath(post.slug)}`,
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

export function postStructuredData(post: PostSummary): Graph {
  const url = `${siteUrl}${postsPath(post.slug)}`;

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
        inLanguage: "en",
        author: person,
        publisher: person,
        isPartOf: website,
      },
    ],
  };
}
