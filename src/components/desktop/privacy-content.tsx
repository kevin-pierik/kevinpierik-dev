import { about, privacy } from "@/content/desktop";

export function PrivacyContent() {
  return (
    <div className="flex flex-col gap-[1em] font-mono text-xs/relaxed">
      {privacy.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}

      <p>
        {privacy.contact}{" "}
        <a
          href={`mailto:${about.email}`}
          className="underline-offset-2 hover:decoration-dashed hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {about.email}
        </a>
      </p>
    </div>
  );
}
