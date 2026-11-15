import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import NextLink from "next/link";

import { linkStyles } from "@/components/link";
import { getDictionary, getLocale, locales } from "@/features/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const { colophon, languageLabel } = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pt-[10lh] pb-6 text-muted sm:pb-8">
      <p>© {year} Kevin Pierik.</p>
      <p className="mt-[1lh] max-w-[80ch]">{colophon}</p>
      <NavigationMenu aria-label={languageLabel} className="mt-[1lh]">
        <NavigationMenuList className="flex gap-x-6">
          {locales.map((other) => (
            <NavigationMenuItem key={other}>
              <NavigationMenuLink
                className={`${linkStyles.nav} data-current:text-foreground`}
                current={other === locale}
                render={
                  <NextLink
                    href={getDictionary(other).path}
                    hrefLang={other}
                    lang={other}
                  />
                }
              >
                {getDictionary(other).languageName}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </footer>
  );
}
