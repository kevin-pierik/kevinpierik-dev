import { formatDate } from "@/features/blog/format-date";
import { readingTime } from "@/features/blog/reading-time";
import type { Post } from "@/features/blog/types";
import { DocumentContent } from "@/features/desktop/document-content";
import { ArticleText } from "@/features/rich-text/article-text";

type PostWindowProps = {
  post: Post;
  author: string;
};

export function PostWindow({ post, author }: PostWindowProps) {
  const details = [
    { label: "AUTHOR", value: author },
    { label: "PUBLISHED", value: formatDate(post.publishedAt) },
    { label: "READING", value: readingTime(post.body) },
    ...(post.excerpt ? [{ label: "ABOUT", value: post.excerpt }] : []),
  ];

  return (
    <DocumentContent details={details}>
      <ArticleText value={post.body} />
    </DocumentContent>
  );
}
