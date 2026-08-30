import {
  contact,
  education,
  experience,
  information,
  role,
  skills,
  social,
  type ResumeRow,
  type ResumeSection,
} from "@/features/resume/content";
import { siteConfig } from "@/features/site/config";

type SectionProps = {
  id: string;
  section: ResumeSection;
  className?: string;
};

function Section({ id, section, className }: SectionProps) {
  return (
    <section aria-labelledby={id} className={className}>
      <h2 className="text-[1em]/[inherit] font-bold uppercase" id={id}>
        {section.label}
      </h2>
      {section.entries.map((entry) => (
        <div key={entry.title}>
          <h3 className="text-[1em]/[inherit] font-bold">{entry.title}</h3>
          <ul>
            {entry.lines.map((line) => (
              <li className="pl-[3em]" key={line}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Row({ row }: { row: ResumeRow }) {
  const value = row.href ? (
    <a
      className="underline decoration-mist/35 decoration-1 underline-offset-[0.25em] hover:decoration-mist focus-visible:decoration-mist focus-visible:outline-none"
      href={row.href}
    >
      {row.value}
    </a>
  ) : (
    row.value
  );

  if (!row.key) {
    return <li className="pl-[3em]">{value}</li>;
  }

  return (
    <li className="flex">
      <span className="w-[3em] shrink-0">{row.key}</span>
      <span>{value}</span>
    </li>
  );
}

export function ResumePage() {
  return (
    <main
      aria-labelledby="page-title"
      className="flex h-svh flex-col overflow-y-auto overscroll-none bg-black px-3 py-3 text-[0.75rem]/[1.32] font-bold text-mist [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif] sm:px-[1.35vw] sm:py-[1.35vw]"
      id="main"
    >
      <header className="grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
        <p>
          {siteConfig.name}
          <br />
          {role}
        </p>

        <nav aria-label="Social profiles" className="sm:col-start-4">
          <ul>
            {social.map((item) => (
              <li key={item.value}>
                <a
                  className="underline decoration-mist/35 decoration-1 underline-offset-[0.25em] hover:decoration-mist focus-visible:decoration-mist focus-visible:outline-none"
                  href={item.href}
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <h1
        className="mt-auto -ml-[0.088em] text-[14vw]/[0.78] font-bold tracking-[-0.02em]"
        id="page-title"
      >
        {siteConfig.name}
      </h1>

      <div className="mt-[7.8vh] grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
        <div className="sm:col-start-2">
          <Section id="education" section={education} />
          <Section
            className="mt-[1.35em]"
            id="skills"
            section={skills}
          />
        </div>

        <Section
          className="sm:col-start-3"
          id="experience"
          section={experience}
        />

        <div className="col-span-2 sm:col-span-1 sm:col-start-4">
          <section aria-labelledby="contact">
            <h2 className="text-[1em]/[inherit] font-bold uppercase" id="contact">
              Contact
            </h2>
            <ul>
              {contact.map((row) => (
                <Row key={row.value} row={row} />
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="information"
            className="mt-[1.35em] max-w-[75%] sm:max-w-[41em]"
          >
            <h2
              className="text-[1em]/[inherit] font-bold uppercase"
              id="information"
            >
              Information
            </h2>
            {information.map((paragraph, index) => (
              <p
                className={index > 0 ? "mt-[1.35em]" : undefined}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
