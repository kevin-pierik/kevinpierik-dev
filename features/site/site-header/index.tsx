import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";

import { Link, linkStyles } from "@/components/link";
import { getDictionary, getLocale } from "@/features/i18n";

type SiteHeaderProps = {
  current?: "index" | "blog";
};

export async function SiteHeader({ current }: SiteHeaderProps) {
  const locale = await getLocale();
  const { role, navigationLabel, indexLabel, path, blogLabel, blogPath } =
    getDictionary(locale);
  const sections = [
    { key: "index", label: indexLabel, href: path },
    { key: "blog", label: blogLabel, href: blogPath },
  ] as const;

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-[1lh] px-6 py-6 sm:pt-8">
      <div>
        {current === "index" ? (
          <h1 id="page-title">Kevin Pierik</h1>
        ) : (
          <p>
            <Link href={path} variant="nav">
              Kevin Pierik
            </Link>
          </p>
        )}
        <p className="text-muted">{role}</p>
      </div>
      <NavigationMenu aria-label={navigationLabel}>
        <NavigationMenuList className="flex gap-2">
          {sections.map((section) => (
            <NavigationMenuItem key={section.key}>
              <NavigationMenuLink
                className={linkStyles.subtle}
                current={section.key === current}
                render={<NextLink href={section.href} />}
              >
                {section.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
