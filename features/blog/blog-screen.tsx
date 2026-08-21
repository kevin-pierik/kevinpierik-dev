import { PostWindow } from "@/features/blog/post-window";
import { getPost, getPosts } from "@/features/blog/resolve";
import { Desktop } from "@/features/desktop/desktop";
import { LocalTime } from "@/features/desktop/local-time";
import { getShellContext, toEntry } from "@/features/desktop/shell";
import { cn } from "@/features/style/utils";

type BlogScreenProps = {
  slug?: string;
  fontClassName?: string;
};

export async function BlogScreen({ slug, fontClassName }: BlogScreenProps) {
  const [{ settings, corner, cornerContent }, posts] = await Promise.all([
    getShellContext(),
    getPosts(),
  ]);

  const open = slug ? await getPost(slug) : null;

  return (
    <main
      id="main"
      data-slot="blog-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view="explorer"
        name={settings.name}
        navigation={settings.navigation}
        activeHref="/blog"
        status={<LocalTime />}
        footerNote={settings.footerNote}
        corner={corner.map(toEntry)}
        sidebar={posts.map((post) => ({
          id: post.slug,
          label: post.title,
          href: `/blog/${post.slug}`,
        }))}
        sidebarLabel="blog"
        indexHref="/blog"
        document={
          open
            ? { id: open.slug, label: open.title, title: open.title }
            : undefined
        }
        content={{
          ...cornerContent,
          ...(open
            ? { [open.slug]: <PostWindow post={open} author={settings.name} /> }
            : {}),
        }}
      />
    </main>
  );
}
