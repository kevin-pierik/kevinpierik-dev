import { Desktop } from "@/components/desktop/desktop";
import { PrivacyContent } from "@/components/desktop/privacy-content";
import { ResumeContent } from "@/components/desktop/resume-content";
import { LocalTime } from "@/components/sections/local-time";
import { siteConfig } from "@/config/site";

type WorksDesktopProps = {
  activeProjectId?: string;
};

export function WorksDesktop({ activeProjectId }: WorksDesktopProps) {
  return (
    <main
      id="main"
      data-slot="works-desktop"
      className="h-svh bg-background px-1.5 pb-1.5"
    >
      <Desktop
        mode="works"
        name={siteConfig.name}
        status={<LocalTime />}
        activeProjectId={activeProjectId}
        content={{
          "curriculum-vitae": <ResumeContent />,
          privacy: <PrivacyContent />,
        }}
      />
    </main>
  );
}
