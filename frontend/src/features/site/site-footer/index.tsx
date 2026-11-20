import { getSettings } from "@/features/site/fetch";

export async function SiteFooter() {
  const settings = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pt-[10lh] pb-6 text-muted sm:pb-8">
      <p>© {year} Kevin Pierik.</p>
      {settings?.colophon ? (
        <p className="mt-[1lh] max-w-[80ch]">{settings.colophon}</p>
      ) : null}
    </footer>
  );
}
