import { Link } from "@/components/link";
import { siteName } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

const connectLinks = [
  { label: "Email", handle: email, href: `mailto:${email}` },
  ...socialLinks,
  { label: "RSS", handle: "feed.xml", href: "/feed.xml" },
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
      <div className="grid content-start gap-y-[0.5lh] text-muted site:text-right">
        <p>
          © {year} {siteName}
        </p>
        <p>
          <Link href="/privacy" variant="plain">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
