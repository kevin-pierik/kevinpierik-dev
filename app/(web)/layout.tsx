import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";

export const metadata = sharedMetadata;

export const viewport = sharedViewport;

export default function WebLayout({ children }: LayoutProps<"/">) {
  return <SharedWebLayout>{children}</SharedWebLayout>;
}
