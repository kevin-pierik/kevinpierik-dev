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
      className="@container overflow-hidden rounded-sm border border-border bg-ink-shade/90 backdrop-blur-sm"
    >
      <p className="border-b border-border px-4 py-3 font-mono text-xs tracking-[0.12em] text-mist uppercase">
        {label}
      </p>

      <div className="px-4 py-8">
        <pre
          aria-hidden
          className="font-mono text-paper"
          style={{
            fontSize: `min(calc((100cqw - 2rem) / ${Math.round(columns * 0.6)}), 1.35rem)`,
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
