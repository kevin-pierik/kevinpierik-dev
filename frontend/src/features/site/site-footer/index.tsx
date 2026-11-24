import { Link } from "@/components/link";
import { siteName } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

const connectLinks = [
  { label: "Email", handle: email, href: `mailto:${email}` },
  ...socialLinks,
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-title"
      className="site-container grid gap-y-[2lh] pt-[10lh] pb-[4lh] site:grid-site"
    >
      <h2 className="site:col-span-2" id="footer-title">
        Connect
      </h2>
      <dl className="grid content-start gap-y-[1lh] site:col-span-4 site:col-start-3">
        {connectLinks.map(({ label, handle, href }) => (
          <div key={label}>
            <dt className="text-muted">{label}</dt>
            <dd>
              <Link href={href} variant="nav">
                {handle}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      <div className="grid content-start gap-y-[0.5lh] text-muted site:col-span-2 site:col-start-11 site:text-right">
        <p>
          © {year} {siteName}
        </p>
        <p>
          <Link href="/privacy" variant="nav">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
