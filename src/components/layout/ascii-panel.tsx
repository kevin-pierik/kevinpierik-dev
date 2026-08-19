type AsciiPanelProps = {
  label: string;
  art: string;
  columns: number;
  caption: string;
};

export function AsciiPanel({ label, art, columns, caption }: AsciiPanelProps) {
  return (
    <div
      data-slot="ascii-panel"
      className="overflow-hidden rounded-sm border border-border bg-ink-shade"
    >
      <p className="border-b border-border px-4 py-3 font-mono text-xs tracking-[0.12em] text-mist uppercase">
        {label}
      </p>

      <div className="overflow-x-auto px-4 py-8">
        <pre
          aria-hidden
          className="w-max font-mono text-paper"
          style={{
            fontSize: `min(calc((100vw - 6rem) / ${Math.round(columns * 0.62)}), 1.35rem)`,
            lineHeight: 1.05,
          }}
        >
          {art}
        </pre>
        <p className="sr-only">{caption}</p>
      </div>
    </div>
  );
}
