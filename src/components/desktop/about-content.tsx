import { siteConfig } from "@/config/site";
import { about } from "@/content/desktop";

const linkStyle =
  "underline underline-offset-2 hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function AboutContent() {
  return (
    <div className="flex flex-col gap-[1em] font-mono text-xs/relaxed">
      <p>{about.intro}</p>

      <p>
        {siteConfig.social.length > 0 && (
          <>
            Find him on{" "}
            {siteConfig.social.map((item, index) => (
              <span key={item.href}>
                {index > 0 && ", "}
                <a
                  href={item.href}
                  rel="me noreferrer"
                  target="_blank"
                  draggable={false}
                  className={linkStyle}
                >
                  {item.label}
                </a>
              </span>
            ))}
            {" or "}
          </>
        )}
        <a href={`mailto:${about.email}`} draggable={false} className={linkStyle}>
          get in touch directly
        </a>
        .
      </p>

      <p className="text-mist">
        &copy; {new Date().getFullYear()} {siteConfig.name}.
      </p>
    </div>
  );
}
