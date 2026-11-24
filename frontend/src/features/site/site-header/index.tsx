import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";

import { Link, linkStyles } from "@/components/link";
import { siteName } from "@/features/site";
import { getSettings } from "@/features/site/fetch";

type SiteHeaderProps = {
  current?: string;
};

export async function SiteHeader({ current }: SiteHeaderProps) {
  const settings = await getSettings();
  const isHome = current === "/";
  const navigation = settings?.navigation ?? [];
  const name = (
    <Link href="/" variant="nav">
      {siteName}
    </Link>
  );

  return (
    <header className="sticky top-0 z-10">
      <div aria-hidden="true" className="header-blur">
        <div />
        <div />
        <div />
      </div>
      <div className="relative site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-[1lh] py-6 sm:pt-8">
        <div>
          {isHome ? <h1 id="page-title">{name}</h1> : <p>{name}</p>}
          {settings?.role ? (
            <p className="text-muted">{settings.role}</p>
          ) : null}
        </div>
        {navigation.length > 0 ? (
          <NavigationMenu aria-label="Site">
            <NavigationMenuList className="flex gap-3">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.uri}>
                  <NavigationMenuLink
                    className={`${linkStyles.nav} text-muted data-current:text-foreground`}
                    current={
                      current === item.uri ||
                      current?.startsWith(`${item.uri}/`)
                    }
                    render={<NextLink href={item.uri} />}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}
      </div>
    </header>
  );
}
