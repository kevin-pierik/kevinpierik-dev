export function HoverArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`lucide ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path
        className="origin-right -translate-x-[3px] scale-x-0 opacity-0 transition-[translate,scale,opacity] duration-200 [transform-box:fill-box] group-hover:translate-x-0 group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100 group-focus-visible:opacity-100"
        d="M9 12h9"
      />
      <path
        className="-translate-x-[3px] transition-[translate] duration-200 group-hover:translate-x-0 group-focus-visible:translate-x-0"
        d="m14 8 4 4-4 4"
      />
    </svg>
  );
}
