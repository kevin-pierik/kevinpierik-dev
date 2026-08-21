import type { PostSummary } from "@/features/blog/types";
import { siteConfig } from "@/features/site/config";
import type { Settings } from "@/features/site/types";

export function personStructuredData(settings: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    url: siteConfig.url,
    description: settings.description,
    ...(settings.social.length > 0
      ? { sameAs: settings.social.map((item) => item.href) }
      : {}),
  };
}


export function websiteStructuredData(settings: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.name,
    alternateName: settings.title,
    url: siteConfig.url,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: {
      "@type": "Person",
      name: settings.name,
      url: siteConfig.url,
    },
  };
}

type Crumb = { name: string; href: string };

export function breadcrumbStructuredData(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };
}

export function blogPostingStructuredData(post: PostSummary, name: string) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt || undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name, url: siteConfig.url },
    publisher: { "@type": "Person", name, url: siteConfig.url },
  };
}
