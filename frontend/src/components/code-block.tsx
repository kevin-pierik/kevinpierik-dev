import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { bundledLanguages, bundledLanguagesInfo, codeToHast } from "shiki";

import { CopyButton, type CopyLabels } from "@/components/copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
  highlightedLines?: number[] | null;
  labels: CopyLabels;
  className?: string;
};

export async function CodeBlock({
  code,
  lang = "text",
  highlightedLines,
  labels,
  className,
}: CodeBlockProps) {
  const source = code.replace(/\n+$/, "");
  const language = bundledLanguagesInfo.find(
    ({ id, aliases }) => id === lang || aliases?.includes(lang),
  )?.name;
  const hast = await codeToHast(source, {
    lang: lang in bundledLanguages ? lang : "text",
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: "light-dark()",
    transformers: [
      {
        line(node, line) {
          if (highlightedLines?.includes(line)) {
            node.properties["data-highlighted"] = "";
          }
        },
      },
    ],
  });

  return (
    <div
      className={`rounded-2xl bg-background ring-1 ring-foreground/15 dark:bg-foreground/3 dark:ring-foreground/10 [&>pre]:max-h-[calc(20lh+1.75rem)] [&>pre]:overflow-auto [&>pre]:overscroll-x-none [&>pre]:rounded-b-2xl [&>pre]:bg-transparent! [&>pre]:px-4 [&>pre]:py-3.5 [&>pre]:font-mono [&>pre]:text-[0.8125rem] [&>pre]:leading-[1.7] [&>pre]:focus-visible:outline-3 [&>pre]:focus-visible:-outline-offset-3 [&>pre]:focus-visible:outline-focus ${className ?? ""}`}
      data-code-frame=""
      data-numbered={source.includes("\n") || undefined}
    >
      <div className="flex min-h-11 items-center justify-between border-b border-foreground/10 pr-1.5 pl-4">
        <span className="text-[0.8125rem] text-muted">{language}</span>
        <CopyButton labels={labels} text={source} />
      </div>
      {toJsxRuntime(hast, { Fragment, jsx, jsxs })}
    </div>
  );
}
