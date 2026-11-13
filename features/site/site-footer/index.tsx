export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-[50rem] px-6 pt-[10lh] pb-16 text-muted sm:pb-[4.5rem]">
      <p>© {year} Kevin Pierik.</p>
    </footer>
  );
}
