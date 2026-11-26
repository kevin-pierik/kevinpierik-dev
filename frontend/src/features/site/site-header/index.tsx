import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";
import type { CSSProperties } from "react";

import { Link, linkStyles } from "@/components/link";
import { contactPath, isCurrentPath, siteName } from "@/features/site";
import { getSettings } from "@/features/site/fetch";
import { email, socialLinks } from "@/features/site/social-links";
import { headingStyles } from "@/features/sanity/rich-text";

import { SiteMenu } from "./site-menu";

type SiteHeaderProps = {
  current?: string;
};

const bar =
  "site-container flex items-center justify-between gap-x-8 py-6 sm:pt-8";

export async function SiteHeader({ current }: SiteHeaderProps) {
  const settings = await getSettings();
  const navigation = (settings?.navigation ?? []).map((item) => ({
    ...item,
    current: isCurrentPath(current, item.uri),
  }));
  const identity = (
    <div>
      <p>
        <Link href="/" variant="plain">
          {siteName}
        </Link>
      </p>
      {settings?.role ? <p className="text-muted">{settings.role}</p> : null}
    </div>
  );

  return (
    <header className="sticky top-0 z-10">
      <div aria-hidden="true" className="header-blur">
        <div />
        <div />
        <div />
      </div>
      <div className={`relative ${bar}`}>
        {identity}
        <div className="hidden items-center gap-4 site:flex">
          {navigation.length > 0 ? (
            <NavigationMenu aria-label="Site">
              <NavigationMenuList className="flex gap-1">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.uri}>
                    <NavigationMenuLink
                      className={`${linkStyles.pill} text-muted data-current:text-foreground`}
                      current={item.current}
                      render={<NextLink href={item.uri} />}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          ) : null}
          <Link href={contactPath} variant="primary">
            Get in touch
          </Link>
        </div>
        <SiteMenu barClassName={bar} identity={identity}>
          <nav aria-label="Site" className="site-container pt-6">
            <ul className={headingStyles.section}>
              {[
                {
                  title: "Home",
                  uri: "/",
                  current: isCurrentPath(current, "/"),
                },
                ...navigation,
              ].map((item, index) => (
                <li
                  key={item.uri}
                  style={{ "--index": index } as CSSProperties}
                >
                  <Link
                    aria-current={item.current ? "page" : undefined}
                    className="inline-block py-1.5"
                    href={item.uri}
                    variant="plain"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <dl className="site-container grid gap-y-[1lh] pt-12">
            {[
              { label: "Email", handle: email, href: `mailto:${email}` },
              ...socialLinks,
            ].map(({ label, handle, href }) => (
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
          <p className="site-container mt-auto pt-12 pb-10">
            <Link
              className="min-h-12 w-full justify-center text-base"
              href={contactPath}
              variant="primary"
            >
              Get in touch
            </Link>
          </p>
        </SiteMenu>
      </div>
    </header>
  );
}
