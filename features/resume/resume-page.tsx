import { siteConfig } from "@/features/site/config";
import { cn } from "@/features/style/utils";
import { Geist } from "next/font/google";

const geist = Geist({
  display: "swap",
  subsets: ["latin"],
});

const linkedIn = siteConfig.social[0]?.href ?? "";

const linkClass =
  "underline decoration-1 underline-offset-2 hover:no-underline focus-visible:no-underline focus-visible:outline-none";
const labelClass =
  "mb-5 text-[0.56rem]/[1.1] font-medium uppercase tracking-[0.04em]";

export function ResumePage() {
  return (
    <main
      className={cn(
        geist.className,
        "h-svh overflow-hidden bg-paper p-4 text-left text-[clamp(0.6rem,0.55vw,0.7rem)]/[1.25] font-normal text-ink sm:px-[3vw] sm:py-8",
      )}
    >
      <h1 className="text-left text-[inherit] leading-[1.05] font-medium tracking-normal">
        Kevin Pierik is a frontend developer based in Hardenberg, the
        Netherlands.
      </h1>

      <div className="mt-[clamp(4rem,8vh,7rem)] grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-[6vw]">
        <section>
          <h2 className={labelClass}>Agency;</h2>
          <a className={linkClass} href="https://friday.nl">
            Friday Digital Agency
          </a>
        </section>

        <section>
          <h2 className={labelClass}>Services;</h2>
          <p>
            Frontend development
            <br />
            UX implementation
          </p>

          <h2 className={cn(labelClass, "mt-10")}>Résumé;</h2>
          <a className={linkClass} href="/files/kevin-pierik.pdf">
            Download
          </a>
        </section>

        <section>
          <h2 className={labelClass}>Contact;</h2>
          <a className={linkClass} href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>

          {linkedIn ? (
            <>
              <h2 className={cn(labelClass, "mt-10")}>Social;</h2>
              <a className={linkClass} href={linkedIn}>
                @kevinpierik
              </a>
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
}
