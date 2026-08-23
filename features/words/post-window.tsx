import { formatDate } from "@/features/words/format-date";
import { readingTime } from "@/features/words/reading-time";
import type { Post } from "@/features/words/types";
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
