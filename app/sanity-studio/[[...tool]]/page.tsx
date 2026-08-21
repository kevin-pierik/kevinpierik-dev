import { Studio } from "@/app/sanity-studio/[[...tool]]/studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
