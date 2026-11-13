import { Link } from "@/components/link";

const links = [
  { label: "Email", href: "mailto:kevinpierik@icloud.com" },
  { label: "LinkedIn", href: "https://nl.linkedin.com/in/kevin-pierik" },
  { label: "GitHub", href: "https://github.com/kevin-pierik" },
  { label: "Instagram", href: "https://www.instagram.com/kevinpierikk" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[50rem] flex-wrap items-end justify-between gap-x-8 gap-y-[1lh] px-6 pt-16 sm:pt-[4.5rem]">
      <div>
        <h1 id="page-title">Kevin Pierik</h1>
        <p className="text-muted">Frontend Developer</p>
      </div>
      <nav aria-label="Contact and profiles">
        <ul className="flex flex-wrap gap-x-4">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link className="font-medium" href={href} variant="nav">
                {label}
                <span aria-hidden="true" className="ml-0.5 text-muted">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
