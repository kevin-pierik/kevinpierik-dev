import { Link } from "@/components/link";
import { getDictionary, getLocale } from "@/features/i18n";

export async function SiteHeader() {
  const locale = await getLocale();
  const { role, navigationLabel, indexLabel, path } = getDictionary(locale);

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-[1lh] px-6 py-6 sm:pt-8">
      <div>
        <h1 id="page-title">Kevin Pierik</h1>
        <p className="text-muted">{role}</p>
      </div>
      <nav aria-label={navigationLabel}>
        <ul className="flex gap-2">
          <li>
            <Link aria-current="page" href={path} size="sm" variant="subtle">
              {indexLabel}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
