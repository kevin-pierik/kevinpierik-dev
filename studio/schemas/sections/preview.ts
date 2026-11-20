type Block = {_type?: string; children?: {text?: string}[]}

type Entry = {start?: string; end?: string; current?: boolean}

export function blockText(blocks: Block[] | undefined, length = 60) {
  const text = (blocks ?? [])
    .filter((block) => block._type === 'block')
    .map((block) => (block.children ?? []).map((child) => child.text ?? '').join(''))
    .join(' ')
    .trim()

  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text
}

export function entriesSummary(entries: Entry[] | undefined) {
  const list = entries ?? []
  if (list.length === 0) return 'No items'

  const count = `${list.length} ${list.length === 1 ? 'item' : 'items'}`
  const starts = list.flatMap((entry) => (entry.start ? [entry.start.slice(0, 4)] : [])).sort()
  if (starts.length === 0) return count

  const first = starts[0]
  const last = list.some((entry) => entry.current)
    ? 'present'
    : list
        .flatMap((entry) => [entry.end, entry.start])
        .flatMap((date) => (date ? [date.slice(0, 4)] : []))
        .sort()
        .at(-1)

  return `${count} · ${first === last ? first : `${first}–${last}`}`
}
