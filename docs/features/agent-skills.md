# Agent skills

Coding agents such as Claude Code, Codex, and Cursor load skills from `.agents/skills/`. `.claude/skills` is a symlink to the same folder, and `skills-lock.json` records where each skill came from.

## Installed skills

| Skill                           | Source                      | Use it for                                         |
| ------------------------------- | --------------------------- | -------------------------------------------------- |
| `ui-sdk`                        | `vercel-labs/ui`            | Building interfaces with UI SDK                    |
| `next-*` (six skills)           | `vercel/next.js`            | Next.js bundle, caching, prefetching, and dev loop |
| `agent-browser`                 | `vercel-labs/agent-browser` | Driving a real browser                             |
| `vercel-react-best-practices`   | `vercel-labs/agent-skills`  | React and Next.js performance                      |
| `vercel-composition-patterns`   | `vercel-labs/agent-skills`  | Component architecture                             |
| `vercel-react-view-transitions` | `vercel-labs/agent-skills`  | View Transition animations                         |
| `web-design-guidelines`         | `vercel-labs/agent-skills`  | UI and accessibility reviews                       |
| `writing-guidelines`            | `vercel-labs/agent-skills`  | Reviewing prose and docs                           |
| `vercel-optimize`               | `vercel-labs/agent-skills`  | Vercel cost and performance                        |

## Managing skills

Install or update a skill with the CLI, never by hand:

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code
```

Skills are excluded from Prettier and ESLint, so their files stay identical to the source. `.gitattributes` marks them as vendored, so GitHub leaves them out of the language statistics.
