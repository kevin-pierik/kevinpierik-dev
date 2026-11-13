import { Link } from "@/components/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-[50rem] px-6 pt-[10lh] pb-16 text-muted sm:pb-[4.5rem]">
      <p>© {year} Kevin Pierik.</p>
      <p className="mt-[0.5lh] max-w-[36rem]">
        This is a static website built with Next.js and hosted on Vercel. It
        doesn’t use cookies, and it follows your system’s light or dark mode and
        reduced-motion setting. The source is on{" "}
        <Link href="https://github.com/kevin-pierik/kevinpierik-dev">
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
}
