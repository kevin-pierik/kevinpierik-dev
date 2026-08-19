import type { Metadata } from "next";

import { ContentPage } from "@/components/layout/content-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.domain} handles data: no cookies, no analytics, no tracking.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <ContentPage title="Privacy policy" updated="Last updated 19 August 2026">
      <p>
        This is a static website. It sets no cookies, runs no analytics, loads no
        tracking scripts, and has no accounts, comments or forms.
      </p>

      <h2>What gets processed</h2>
      <p>
        The site is hosted by Vercel. Like any web host, Vercel processes
        technical request data — IP address, user agent, requested URL and
        timestamp — to serve the pages and to protect its platform. Those server
        logs are not used to profile you and are not combined with other data by
        me.
      </p>
      <p>
        Fonts and every other asset are served from this domain, so loading a
        page makes no request to a third party.
      </p>

      <h2>Email</h2>
      <p>
        If you email me at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>, I process
        your message and address to reply to you. That correspondence stays in my
        mailbox and is not used for anything else.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask me for access to, correction of, or deletion
        of any personal data I hold about you. You can also complain to the Dutch
        data protection authority, the Autoriteit Persoonsgegevens. Reach me at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </ContentPage>
  );
}
