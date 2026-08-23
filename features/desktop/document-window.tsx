import { linkVariants } from "@/components/link";
import { ArticleText } from "@/features/rich-text/article-text";
import { DocumentContent } from "@/features/desktop/document-content";
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
      <DocumentContent details={window.details}>
        <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start lg:gap-10">
          <div className="lg:flex-1">
            <MediaGrid media={window.media} />
          </div>
          <div className="lg:w-[22rem] lg:shrink-0">
            <ArticleText value={window.body} />
          </div>
        </div>
      </DocumentContent>
    );
  }

  return (
    <DocumentContent details={window.details}>
      <ArticleText value={window.body} />
    </DocumentContent>
  );
}
