import { disableDraftMode } from "@/features/draft-mode/actions";

export function DraftModeBar() {
  return (
    <div
      data-slot="draft-mode-bar"
      className="fixed bottom-2 left-2 z-100 flex items-center gap-2 border border-orange/60 bg-ink-deep px-2 py-1 font-mono text-[11px] text-orange"
    >
      <span aria-hidden="true">&#9679;</span>
      Draft mode
      <form action={disableDraftMode}>
        <button
          type="submit"
          className="cursor-pointer text-paper underline underline-offset-2 hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Exit
        </button>
      </form>
    </div>
  );
}
