import { ArticleText } from "@/features/rich-text/article-text";
import { DocumentContent } from "@/features/desktop/document-content";
import type { WindowDocument } from "@/features/desktop/types";

const footerLinkStyle =
  "flex min-h-7 shrink-0 items-center justify-end border-t border-paper/25 px-2 font-mono text-[11px] text-mist underline underline-offset-2 hover:text-paper hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring";

type DocumentWindowProps = {
  window: WindowDocument;
};

export function DocumentWindow({ window }: DocumentWindowProps) {
  if (window.file) {
    return (
      <DocumentContent
        details={window.details}
        bodyClassName="overflow-hidden"
        bodyLayout="full"
        footer={
          <a href={window.file.url} download className={footerLinkStyle}>
            Download PDF
          </a>
        }
      >
        <iframe
          src={`${window.file.url}#view=FitH&toolbar=1&navpanes=0`}
          title={window.title}
          className="size-full bg-paper"
        />
      </DocumentContent>
    );
  }

  return (
    <DocumentContent details={window.details}>
      <ArticleText value={window.body} />
    </DocumentContent>
  );
}
