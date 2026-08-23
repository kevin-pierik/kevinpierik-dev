import { PostWindow } from "@/features/words/post-window";
import { getPost, getPosts } from "@/features/words/resolve";
import { Desktop } from "@/features/desktop/desktop";
import { LocalTime } from "@/features/desktop/local-time";
import { getShellContext } from "@/features/desktop/shell";
import { cn } from "@/features/style/utils";

type WordsScreenProps = {
  slug?: string;
  fontClassName?: string;
};

export async function WordsScreen({ slug, fontClassName }: WordsScreenProps) {
  const [{ settings }, posts] = await Promise.all([
    getShellContext(),
    getPosts(),
  ]);

  const open = slug ? await getPost(slug) : null;

  return (
    <main
      id="main"
      data-slot="words-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view="explorer"
        name={settings.name}
        navigation={settings.navigation}
        activeHref="/words"
        status={<LocalTime />}
        footerNote={settings.footerNote}
        cornerLinks={settings.cornerLinks}
        sidebar={posts.map((post) => ({
          id: post.slug,
          label: post.title,
          href: `/words/${post.slug}`,
        }))}
        sidebarLabel="words"
        indexHref="/words"
        document={
          open
            ? { id: open.slug, label: open.title, title: open.title }
            : undefined
        }
        content={{
          ...(open
            ? { [open.slug]: <PostWindow post={open} author={settings.name} /> }
            : {}),
        }}
      />
    </main>
  );
}
