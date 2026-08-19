export function ScrollHint() {
  return (
    <p
      aria-hidden
      className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-foreground/70 uppercase"
    >
      Scroll
      <span className="animate-nudge inline-block">&darr;</span>
    </p>
  );
}
