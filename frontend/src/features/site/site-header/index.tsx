import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";
import type { CSSProperties } from "react";

import { focus, Link, linkStyles } from "@/components/link";
import { contactPath, siteName } from "@/features/site";
import { getSettings } from "@/features/site/fetch";
import { email, socialLinks } from "@/features/site/social-links";
import { headingStyles } from "@/features/sanity/rich-text";

import { CloseMenu } from "./close-menu";

type SiteHeaderProps = {
  current?: string;
};

const menuId = "site-menu";
const bar =
  "site-container flex items-center justify-between gap-x-8 py-6 sm:pt-8";
const menuButton = `-mr-2.5 grid size-11 place-items-center rounded-full ${focus}`;

export async function SiteHeader({ current }: SiteHeaderProps) {
  const settings = await getSettings();
  const navigation = (settings?.navigation ?? []).map((item) => ({
    ...item,
    current: current === item.uri || current?.startsWith(`${item.uri}/`),
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
        <button
          className={`${menuButton} site:hidden`}
          popoverTarget={menuId}
          type="button"
        >
          <span aria-hidden="true" className="menu-icon">
            <span />
            <span />
          </span>
          <span className="sr-only">Menu</span>
        </button>
      </div>
      <div
        className="site-menu inset-0 m-0 size-full max-h-none max-w-none flex-col overflow-y-auto bg-background text-foreground open:flex"
        data-lenis-prevent
        id={menuId}
        popover="auto"
      >
        <div className={bar}>
          {identity}
          <button
            className={menuButton}
            popoverTarget={menuId}
            popoverTargetAction="hide"
            type="button"
          >
            <span aria-hidden="true" className="menu-icon">
              <span />
              <span />
            </span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Site" className="site-container pt-6">
          <ul className={headingStyles.section}>
            {[
              { title: "Home", uri: "/", current: current === "/" },
              ...navigation,
            ].map((item, index) => (
              <li key={item.uri} style={{ "--index": index } as CSSProperties}>
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
            className="min-h-12 w-full justify-center text-[1.0625rem]"
            href={contactPath}
            variant="primary"
          >
            Get in touch
          </Link>
        </p>
        <CloseMenu id={menuId} />
      </div>
    </header>
  );
}
