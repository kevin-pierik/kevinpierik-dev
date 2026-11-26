import { Link } from "@/components/link";
import { siteName } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

import { ThemeToggle } from "./theme-toggle";

const connectLinks = [
  { label: "Email", handle: email, href: `mailto:${email}` },
  ...socialLinks,
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-title"
      className="site-container grid gap-y-[2lh] pt-[10lh] pb-[4lh] site:grid-cols-[12.6875rem_1fr_auto] site:gap-x-6"
    >
      <h2 id="footer-title">Connect</h2>
      <dl className="grid content-start gap-y-[1lh]">
        {connectLinks.map(({ label, handle, href }) => (
          <div key={label}>
            <dt className="text-muted">{label}</dt>
            <dd>
              <Link href={href} variant="plain">
                {handle}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col items-start gap-y-[0.5lh] text-muted site:items-end site:text-right">
        <p>
          © {year} {siteName}
        </p>
        <p>
          <Link href="/privacy-policy" variant="plain">
            Privacy policy
          </Link>
        </p>
        <ThemeToggle className="-ml-1.5 site:mt-auto site:-mr-1.5 site:-mb-1.5 site:ml-0" />
      </div>
    </footer>
  );
}
