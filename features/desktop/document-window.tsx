import { linkVariants } from "@/components/link";
import { ArticleText } from "@/features/rich-text/article-text";
import { DocumentContent } from "@/features/desktop/document-content";
import type { WindowDocument } from "@/features/desktop/types";

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
          <a
            href={window.file.url}
            download
            className={linkVariants({ variant: "inset" })}
          >
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
