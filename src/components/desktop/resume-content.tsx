import { DocumentContent } from "@/components/desktop/document-content";

const resume = {
  path: "/files/kevin-pierik.pdf",
  author: "Kevin Pierik",
  updated: "20 August 2026",
  pages: "1",
  about: "Experience, education, and skills in frontend development.",
};

const details = [
  { label: "AUTHOR", value: resume.author },
  { label: "UPDATED", value: resume.updated },
  { label: "PAGES", value: resume.pages },
  { label: "ABOUT", value: resume.about },
];

export function ResumeContent() {
  return (
    <DocumentContent
      details={details}
      bodyClassName="overflow-hidden"
      bodyLayout="full"
      footer={
        <a
          href={resume.path}
          download
          className="flex min-h-7 shrink-0 items-center justify-end border-t border-paper/25 px-2 font-mono text-[11px] text-mist underline underline-offset-2 hover:text-paper hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
        >
          Download PDF
        </a>
      }
    >
      <iframe
        src={`${resume.path}#view=FitH&toolbar=1&navpanes=0`}
        title="Curriculum Vitae of Kevin Pierik"
        className="size-full bg-paper"
      />
    </DocumentContent>
  );
}
