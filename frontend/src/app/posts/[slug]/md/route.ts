import { getArticle, getArticleSlugs } from "@/features/posts/fetch";
import { articleMarkdown } from "@/features/posts/markdown";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/posts/[slug]/md">,
): Promise<Response> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return new Response(articleMarkdown(article), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}
