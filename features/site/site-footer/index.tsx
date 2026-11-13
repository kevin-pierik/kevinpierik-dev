import { Link } from "@/components/link";
import { getDictionary, getLocale, locales } from "@/features/i18n";
import { ThemeSwitcher } from "@/features/site/theme-switcher";

export async function SiteFooter() {
  const locale = await getLocale();
  const { colophon, languageLabel, theme } = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pt-[10lh] pb-6 text-muted sm:pb-8">
      <p>© {year} Kevin Pierik.</p>
      <p className="mt-[1lh] max-w-[80ch]">{colophon}</p>
      <div className="mt-[1lh] flex items-center justify-between gap-x-6">
        <nav aria-label={languageLabel} className="flex items-center gap-x-4">
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
        <ThemeSwitcher labels={theme} />
      </div>
    </footer>
  );
}
