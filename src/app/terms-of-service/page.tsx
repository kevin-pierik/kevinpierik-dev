import type { Metadata } from "next";

import { ContentPage } from "@/components/layout/content-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that apply to ${siteConfig.domain}.`,
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfService() {
  return (
    <ContentPage title="Terms of service" updated="Last updated 19 August 2026">
      <p>
        This is a personal website. Its content is published as-is and may
        change, move or disappear at any time without notice.
      </p>

      <h2>Content</h2>
      <p>
        Everything on this site is mine unless stated otherwise. You are welcome
        to quote from it or link to it with attribution; republishing it as your
        own work is not allowed.
      </p>

      <h2>No warranty</h2>
      <p>
        Nothing here is professional advice, and nothing here comes with a
        warranty. I accept no liability for damage resulting from the use of this
        site or from acting on anything written on it.
      </p>

      <h2>Links</h2>
      <p>
        This site may link to other websites. I have no control over those and am
        not responsible for their content or how they handle your data.
      </p>

      <h2>Applicable law</h2>
      <p>
        Dutch law applies to these terms. Questions go to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </ContentPage>
  );
}
