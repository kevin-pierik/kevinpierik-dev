import { textField } from "@/content/text-field";

export function TextFieldBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <pre className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.7rem]/[1.6] tracking-[0.08em] text-paper/10">
        {textField}
      </pre>
    </div>
  );
}
