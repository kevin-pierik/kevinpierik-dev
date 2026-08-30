import { siteConfig } from "@/features/site/config";

export default function StudioLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.language}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
