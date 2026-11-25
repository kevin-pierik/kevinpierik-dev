import type { Metadata } from "next";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { Link, linkStyles } from "@/components/link";
import { pageMetadata } from "@/features/pages/metadata";
import { contactPath } from "@/features/site";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";
import { email, socialLinks } from "@/features/site/social-links";

export const metadata: Metadata = pageMetadata(
  {
    title: "Get in touch",
    uri: contactPath,
    seo: {
      description:
        "How to reach Kevin Pierik, frontend developer in Hardenberg: by email, on LinkedIn, or through his other profiles.",
    },
  },
  false,
);

const [linkedIn, gitHub, instagram] = socialLinks;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NextLink className={`${linkStyles.text} text-foreground`} href={href}>
      {children}
    </NextLink>
  );
}

const buttons = "min-h-12 px-6 text-[1.0625rem] leading-[1.625rem]";

export default function Contact() {
  return (
    <>
      <SiteHeader current={contactPath} />
      <main
        aria-labelledby="main-title"
        className="site-container pt-18 site:pt-32"
        id="main"
      >
        <div className="text-center">
          <h1
            className="text-[2.25rem] leading-[2.5rem] font-medium tracking-[-0.025em] site:text-[4rem] site:leading-[4.25rem] site:tracking-[-0.035em]"
            id="main-title"
          >
            Get in touch
          </h1>
          <p className="mx-auto mt-7 max-w-[35rem] text-[1.125rem] leading-[1.875rem] text-muted">
            Have a question, an idea, or a project in mind? Email is the
            quickest way to reach me.
          </p>
          <p className="mt-8 flex flex-wrap justify-center gap-2.5 site:mt-10">
            <Link
              className={`${buttons} font-medium`}
              href={`mailto:${email}`}
              variant="primary"
            >
              Send an email
            </Link>
            <Link
              className={`${buttons} font-medium`}
              href={linkedIn.href}
              variant="subtle"
            >
              LinkedIn
            </Link>
          </p>
        </div>
        <div className="mx-auto grid max-w-[40rem] gap-12 pt-24 text-[1.0625rem] leading-[1.625rem] text-muted site:pt-30">
          <section aria-labelledby="email-and-social">
            <h2
              className="text-lg leading-snug font-medium tracking-[-0.01em] text-foreground"
              id="email-and-social"
            >
              Email and social
            </h2>
            <p className="mt-[0.5lh]">
              Write to <InlineLink href={`mailto:${email}`}>{email}</InlineLink>{" "}
              for work, questions about a post, or just to say hi. I’m also on
              LinkedIn as{" "}
              <InlineLink href={linkedIn.href}>{linkedIn.handle}</InlineLink>,
              on GitHub as{" "}
              <InlineLink href={gitHub.href}>{gitHub.handle}</InlineLink>, and
              on Instagram as{" "}
              <InlineLink href={instagram.href}>{instagram.handle}</InlineLink>.
              I live and work in Hardenberg, the Netherlands, and don’t list a
              phone number or postal address.
            </p>
          </section>
          <section aria-labelledby="elsewhere">
            <h2
              className="text-lg leading-snug font-medium tracking-[-0.01em] text-foreground"
              id="elsewhere"
            >
              Elsewhere
            </h2>
            <p className="mt-[0.5lh]">
              Follow new posts with the{" "}
              <InlineLink href="/feed.xml">RSS feed</InlineLink>. Building an
              agent or a crawler? Start at{" "}
              <InlineLink href="/llms.txt">llms.txt</InlineLink> and the{" "}
              <InlineLink href="/sitemap.xml">sitemap</InlineLink> instead of
              scraping pages.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
