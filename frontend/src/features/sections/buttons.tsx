import { Link } from "@/components/link";
import { safeHref } from "@/features/sanity/link/safe-href";

type Button = { _key: string; label: string | null; link: string | null };

type ButtonsProps = {
  buttons: Button[] | null;
  className?: string;
};

export function Buttons({ buttons, className = "" }: ButtonsProps) {
  const links = (buttons ?? []).flatMap(({ _key, label, link }) => {
    const href = safeHref(link);
    return href && label ? [{ _key, label, href }] : [];
  });
  if (links.length === 0) return null;

  return (
    <p className={`flex flex-wrap gap-2.5 ${className}`}>
      {links.map(({ _key, label, href }, index) => (
        <Link
          className="min-h-12 px-6 text-[1.0625rem] leading-[1.625rem]"
          href={href}
          key={_key}
          variant={index === 0 ? "primary" : "outline"}
        >
          {label}
        </Link>
      ))}
    </p>
  );
}
