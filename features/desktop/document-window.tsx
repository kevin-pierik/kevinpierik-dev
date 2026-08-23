import { linkVariants } from "@/components/link";
import { ArticleText } from "@/features/rich-text/article-text";
import {
  DocumentContent,
  DocumentMetadata,
} from "@/features/desktop/document-content";
import { MediaGrid } from "@/features/desktop/media-grid";
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

  if (window.media.length > 0) {
    return (
      <article
        data-slot="document-content"
        className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden"
      >
        <aside className="flex shrink-0 flex-col gap-8 border-b border-paper/25 p-2 lg:w-72 lg:justify-between lg:overflow-y-auto lg:border-r lg:border-b-0">
          <DocumentMetadata details={window.details} />
          <ArticleText value={window.body} />
        </aside>

        <div className="min-h-0 flex-1 p-2 lg:overflow-y-auto">
          <MediaGrid media={window.media} />
        </div>
      </article>
    );
  }

  return (
    <DocumentContent details={window.details}>
      <ArticleText value={window.body} />
    </DocumentContent>
  );
}
