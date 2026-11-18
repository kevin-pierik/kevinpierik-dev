import {
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@ui-sdk/react/timeline";
import Image from "next/image";

import { figureSizes } from "@/components/figure";
import { Link } from "@/components/link";
import type { Locale } from "@/features/i18n";
import { imageProps } from "@/features/sanity/media/image";
import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { blogPath } from "./fetch";
import { formatDate } from "./format-date";

type ArticleCardProps = {
  article: ARTICLES_QUERY_RESULT[number];
  locale: Locale;
  readLabel: string;
};

export function ArticleCard({ article, locale, readLabel }: ArticleCardProps) {
  const { cover } = article;

  return (
    <TimelineItem
      className="group/item grid grid-cols-[7px_1fr] gap-x-4 outline-offset-4 focus-visible:outline-2 site:col-span-full site:grid-site"
      data-cover={cover ? "" : undefined}
    >
      <div
        aria-hidden="true"
        className="relative col-start-1 row-[1/span_5] site:col-[1/3]"
      >
        <div className="absolute inset-y-0 left-0.75 w-px bg-(--border) site:right-0.75 site:left-auto" />
      </div>
      {cover ? (
        <Image
          {...imageProps(cover)}
          alt={cover.alt}
          className="col-start-2 row-start-1 mb-[1.5lh] h-auto w-full bg-subtle site:col-[3/11]"
          placeholder={cover.asset?.metadata?.lqip ? "blur" : "empty"}
          sizes={figureSizes.normal}
        />
      ) : null}
      <div className="contents site:col-[1/3] site:row-start-1 site:flex site:items-center site:justify-end site:gap-3 site:group-data-cover/item:row-start-2">
        <TimelineTime
          className="col-start-2 row-start-1 justify-self-start bg-subtle px-1.5 text-[0.75rem] leading-5 text-muted tabular-nums group-data-cover/item:row-start-2"
          dateTime={article.publishedAt}
        >
          {formatDate(locale, article.publishedAt)}
        </TimelineTime>
        <TimelineMarker className="relative col-start-1 row-start-1 size-1.75 self-center rounded-full bg-muted ring-4 ring-background group-data-cover/item:row-start-2" />
      </div>
      <TimelineTitle
        className="col-start-2 mt-[0.5lh] site:col-[3/11] site:row-start-1 site:mt-0 site:group-data-cover/item:row-start-2"
        // eslint-disable-next-line jsx-a11y/heading-has-content
        render={<h2 />}
      >
        {article.title}
      </TimelineTitle>
      <TimelineDescription className="col-start-2 max-w-[65ch] text-muted site:col-[3/11]">
        {article.description}
      </TimelineDescription>
      <p className="col-start-2 mt-[0.5lh] pb-[4lh] group-last/item:pb-0 site:col-[3/11]">
        <Link href={blogPath(locale, article.slug)} variant="nav">
          {readLabel}
          {" "}
          <span aria-hidden="true">→</span>
        </Link>
      </p>
    </TimelineItem>
  );
}
