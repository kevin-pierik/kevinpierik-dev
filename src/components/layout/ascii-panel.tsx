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
      className="@container h-full overflow-hidden rounded-sm border border-border bg-ink-shade"
    >
      <p className="border-b border-border px-4 py-3 font-mono text-xs tracking-[0.12em] text-mist uppercase sm:px-6">
        {label}
      </p>

      <div className="px-4 py-10 sm:px-6">
        <pre
          aria-hidden
          className="font-mono text-paper"
          style={{
            fontSize: `min(calc((100cqw - 3rem) / ${Math.round(columns * 0.6)}), 1.05rem)`,
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
