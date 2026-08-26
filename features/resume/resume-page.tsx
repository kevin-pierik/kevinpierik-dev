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
import { cn } from "@/features/style/utils";

const gridClass =
  "grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0";
const headingClass = "text-[1em]/[inherit] font-bold uppercase";
const entryClass = "text-[1em]/[inherit] font-bold";
const indentClass = "pl-[3em]";
const linkClass =
  "underline decoration-mist/35 decoration-1 underline-offset-[0.25em] hover:decoration-mist focus-visible:decoration-mist focus-visible:outline-none";

function Section({
  section,
  className,
}: {
  section: ResumeSection;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className={headingClass}>{section.label}</h2>
      {section.entries.map((entry) => (
        <div key={entry.title}>
          <h3 className={entryClass}>{entry.title}</h3>
          <ul>
            {entry.lines.map((line) => (
              <li className={indentClass} key={line}>
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
    <a className={linkClass} href={row.href}>
      {row.value}
    </a>
  ) : (
    row.value
  );

  if (!row.key) {
    return <li className={indentClass}>{value}</li>;
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
      className="flex h-svh flex-col overflow-y-auto overscroll-none bg-black px-3 py-3 sm:px-[1.35vw] sm:py-[1.35vw] text-[0.75rem]/[1.32] font-bold text-mist [font-family:'Helvetica_Neue',Helvetica,Arial,sans-serif]"
      id="main"
    >
      <header className={gridClass}>
        <p>
          {siteConfig.name}
          <br />
          {role}
        </p>

        <ul className="sm:col-start-4">
          {social.map((item) => (
            <li key={item.value}>
              <a className={linkClass} href={item.href}>
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <h1 className="mt-auto -ml-[0.088em] text-[17.6vw]/[0.78] font-bold tracking-[-0.02em]">
        Résumé
      </h1>

      <div className={cn(gridClass, "mt-[7.8vh]")}>
        <div className="sm:col-start-2">
          <Section section={education} />
          <Section className="mt-[1.35em]" section={skills} />
        </div>

        <Section className="sm:col-start-3" section={experience} />

        <div className="col-span-2 sm:col-span-1 sm:col-start-4">
          <section>
            <h2 className={headingClass}>Contact</h2>
            <ul>
              {contact.map((row) => (
                <Row key={row.value} row={row} />
              ))}
            </ul>
          </section>

          <section className="mt-[1.35em] max-w-[75%] sm:max-w-[41em]">
            <h2 className={headingClass}>Information</h2>
            {information.map((paragraph, index) => (
              <p className={cn(index > 0 && "mt-[1.35em]")} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
