import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { profileStructuredData } from "@/features/seo/structured-data";

const title = "Frontend Developer | Kevin Pierik";
const description =
  "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Kevin Pierik",
    locale: "en_US",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kevin Pierik — Frontend Developer in Hardenberg, NL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const link =
  "underline decoration-white/35 decoration-1 underline-offset-[0.25em] hover:decoration-white focus-visible:decoration-white focus-visible:outline-none";
const sectionHeading = "text-[1em]/[inherit] font-bold uppercase";
const entryHeading = "text-[1em]/[inherit] font-bold";

export default function Home() {
  return (
    <>
      <JsonLd data={profileStructuredData} />
      <main
        aria-labelledby="page-title"
        className="flex h-svh flex-col overflow-y-auto overscroll-none bg-black px-3 py-3 text-[0.75rem]/[1.32] font-bold text-white sm:px-[1.35vw] sm:py-[1.35vw]"
        id="main"
      >
        <header className="grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
          <p>
            Kevin Pierik
            <br />
            Frontend Developer
          </p>
          <nav aria-label="Social profiles" className="sm:col-start-4">
            <ul>
              <li>
                <a
                  className={link}
                  href="https://nl.linkedin.com/in/kevin-pierik"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className={link}
                  href="https://www.instagram.com/kevinpierikk"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <h1
          className="mt-auto ml-[-0.088em] text-[14vw]/[0.78] font-bold tracking-[-0.02em]"
          id="page-title"
        >
          Kevin Pierik
        </h1>
        <div className="mt-[7.8vh] grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
          <div className="flex flex-col gap-[1.35em] sm:col-start-2">
            <section aria-labelledby="education">
              <h2 className={sectionHeading} id="education">
                Education
              </h2>
              <div>
                <h3 className={entryHeading}>Deltion College</h3>
                <ul>
                  <li className="pl-[3em]">MBO 4, Software Developer</li>
                  <li className="pl-[3em]">Zwolle, OV</li>
                  <li className="pl-[3em]">September 2023—Present</li>
                </ul>
              </div>
              <div>
                <h3 className={entryHeading}>Vechtdal College</h3>
                <ul>
                  <li className="pl-[3em]">HAVO</li>
                  <li className="pl-[3em]">Hardenberg, OV</li>
                  <li className="pl-[3em]">August 2018</li>
                </ul>
              </div>
            </section>
            <section aria-labelledby="skills">
              <h2 className={sectionHeading} id="skills">
                Software Skills
              </h2>
              <div>
                <h3 className={entryHeading}>Working knowledge in:</h3>
                <ul>
                  <li className="pl-[3em]">Next.js, TypeScript,</li>
                  <li className="pl-[3em]">Tailwind, Vercel</li>
                </ul>
              </div>
            </section>
          </div>
          <section aria-labelledby="experience" className="sm:col-start-3">
            <h2 className={sectionHeading} id="experience">
              Work Experience
            </h2>
            <div>
              <h3 className={entryHeading}>Junior UX Developer</h3>
              <ul>
                <li className="pl-[3em]">Friday Digital Agency</li>
                <li className="pl-[3em]">Hardenberg, OV</li>
                <li className="pl-[3em]">May 2025—Present</li>
              </ul>
            </div>
            <div>
              <h3 className={entryHeading}>Developer Intern</h3>
              <ul>
                <li className="pl-[3em]">Friday Digital Agency</li>
                <li className="pl-[3em]">Hardenberg, OV</li>
                <li className="pl-[3em]">September 2024—January 2025</li>
                <li className="pl-[3em]">(5 months)</li>
              </ul>
            </div>
          </section>
          <div className="col-span-2 sm:col-span-1 sm:col-start-4">
            <section aria-labelledby="contact">
              <h2 className={sectionHeading} id="contact">
                Contact
              </h2>
              <ul>
                <li className="pl-[3em]">Hardenberg, Overijssel</li>
                <li className="pl-[3em]">The Netherlands</li>
                <li className="flex">
                  <span className="w-[3em] shrink-0">P:</span>
                  <span>
                    <a className={link} href="tel:+31615545687">
                      +31 6 15545687
                    </a>
                  </span>
                </li>
                <li className="flex">
                  <span className="w-[3em] shrink-0">E:</span>
                  <span>
                    <a className={link} href="mailto:kevinpierik@icloud.com">
                      kevinpierik@icloud.com
                    </a>
                  </span>
                </li>
              </ul>
            </section>
            <section
              aria-labelledby="information"
              className="mt-[1.35em] max-w-[75%] sm:max-w-[41em]"
            >
              <h2 className={sectionHeading} id="information">
                Information
              </h2>
              <p>
                Kevin Pierik is a frontend developer based in Hardenberg, the
                Netherlands, working at Friday Digital Agency.
              </p>
              <p className="mt-[1.35em]">
                If you would like more information, or to discuss collaborations
                and other opportunities, please don’t hesitate to get in touch
                via email.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
