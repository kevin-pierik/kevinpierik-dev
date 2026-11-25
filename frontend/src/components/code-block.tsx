import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { bundledLanguages, codeToHast } from "shiki";

import { CopyButton, type CopyLabels } from "@/components/copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
  labels: CopyLabels;
  className?: string;
};

export async function CodeBlock({
  code,
  lang = "text",
  labels,
  className,
}: CodeBlockProps) {
  const source = code.replace(/\n+$/, "");
  const hast = await codeToHast(source, {
    lang: lang in bundledLanguages ? lang : "text",
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: "light-dark()",
  });

  return (
    <div
      className={`relative rounded-2xl bg-background ring-1 ring-foreground/15 dark:bg-foreground/3 dark:ring-foreground/10 [&>pre]:max-h-[calc(20lh+1.75rem)] [&>pre]:overflow-auto [&>pre]:overscroll-x-none [&>pre]:rounded-2xl [&>pre]:bg-transparent! [&>pre]:py-3.5 [&>pre]:pr-12 [&>pre]:pl-4 [&>pre]:font-mono [&>pre]:text-[0.8125rem] [&>pre]:leading-[1.7] [&>pre]:focus-visible:outline-2 [&>pre]:focus-visible:-outline-offset-2 [&>pre]:focus-visible:outline-ring ${className ?? ""}`}
      data-code-frame=""
      data-numbered={source.includes("\n") || undefined}
    >
      {toJsxRuntime(hast, { Fragment, jsx, jsxs })}
      <CopyButton
        className="absolute top-1.5 right-1.5"
        labels={labels}
        text={source}
      />
    </div>
  );
}
