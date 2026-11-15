import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";

import { linkStyles } from "@/components/link";
import { getDictionary, getLocale } from "@/features/i18n";

export async function SiteHeader() {
  const locale = await getLocale();
  const { role, navigationLabel, indexLabel, path } = getDictionary(locale);

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-[1lh] px-6 py-6 sm:pt-8">
      <div>
        <h1 id="page-title">Kevin Pierik</h1>
        <p className="text-muted">{role}</p>
      </div>
      <NavigationMenu aria-label={navigationLabel}>
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              className={linkStyles.subtle}
              current
              render={<NextLink href={path} />}
            >
              {indexLabel}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
