import { Link } from "@/components/link";
import { getDictionary, getLocale, locales } from "@/features/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const { colophon, languageLabel } = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="pt-[10lh] pb-16 text-muted sm:pb-[4.5rem]">
      <p>© {year} Kevin Pierik.</p>
      <p className="mt-[1lh] max-w-[80ch]">{colophon}</p>
      <nav
        aria-label={languageLabel}
        className="mt-[1lh] flex items-center gap-x-4"
      >
        <svg
          aria-hidden="true"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <ul className="flex gap-x-6">
          {locales.map((other) => (
            <li key={other}>
              <Link
                aria-current={other === locale ? "page" : undefined}
                className="aria-[current=page]:text-foreground"
                href={getDictionary(other).path}
                hrefLang={other}
                lang={other}
                variant="nav"
              >
                {getDictionary(other).languageName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
