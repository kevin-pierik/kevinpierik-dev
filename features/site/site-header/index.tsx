import { Link } from "@/components/link";

const profiles = [
  { label: "LinkedIn", href: "https://nl.linkedin.com/in/kevin-pierik" },
  { label: "GitHub", href: "https://github.com/kevin-pierik" },
  { label: "Instagram", href: "https://www.instagram.com/kevinpierikk" },
];

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-[1lh] px-6 py-6 sm:pt-8">
      <div>
        <h1 id="page-title">Kevin Pierik</h1>
        <p className="text-muted">Frontend Developer</p>
      </div>
      <nav aria-label="Social profiles">
        <ul className="flex gap-2">
          {profiles.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} size="sm" variant="subtle">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
