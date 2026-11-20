# Agent skills

Coding agents such as Codex and Cursor load skills from `.agents/skills/`. Claude Code only looks in `.claude/skills/`, which is a symlink to `.agents/skills/`. `skills-lock.json` records where each skill came from. Skills are stored once at the repository root; they are not installed separately in `frontend/` or `studio/`.

Skills are repository-level guidance, not workspace dependencies. Apply Next.js and React skills to `frontend/`; use the Sanity and content-modeling skills for `studio/`. Sanity integration work in `frontend/` may need both sets. Tests stay beside the code they cover in their workspace, so there is no top-level test workspace.

| Workspace   | Skills                                                                                                                                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend/` | `next-*`, `vercel-react-*`, `vercel-composition-patterns`, `modern-web-guidance`, `ui-sdk`, `web-design-guidelines`, `agent-browser`, `vercel-optimize`, `seo-aeo-best-practices`, `writing-guidelines` when editing user-facing copy or docs |
| `studio/`   | `sanity-best-practices`, `content-modeling-best-practices`, `writing-guidelines` for Studio copy or docs                                                                                                                                      |
| Both        | `sanity-best-practices` and `portable-text-serialization` when implementing the Sanity-to-frontend integration; `seo-aeo-best-practices` for metadata and structured data; `agent-browser` when browser verification is needed                |

## Installed skills

| Skill                             | Source                             | Use it for                                         |
| --------------------------------- | ---------------------------------- | -------------------------------------------------- |
| `ui-sdk`                          | `vercel-labs/ui`                   | Building interfaces with UI SDK                    |
| `next-*` (six skills)             | `vercel/next.js`                   | Next.js bundle, caching, prefetching, and dev loop |
| `agent-browser`                   | `vercel-labs/agent-browser`        | Driving a real browser                             |
| `vercel-react-best-practices`     | `vercel-labs/agent-skills`         | React and Next.js performance                      |
| `vercel-composition-patterns`     | `vercel-labs/agent-skills`         | Component architecture                             |
| `vercel-react-view-transitions`   | `vercel-labs/agent-skills`         | View Transition animations                         |
| `web-design-guidelines`           | `vercel-labs/agent-skills`         | UI and accessibility reviews                       |
| `writing-guidelines`              | `vercel-labs/agent-skills`         | Reviewing prose and docs                           |
| `vercel-optimize`                 | `vercel-labs/agent-skills`         | Vercel cost and performance                        |
| `modern-web-guidance`             | `GoogleChrome/modern-web-guidance` | Modern web platform features and Baseline support  |
| `sanity-best-practices`           | `sanity-io/agent-toolkit`          | Sanity schemas, GROQ, and Next.js integration      |
| `seo-aeo-best-practices`          | `sanity-io/agent-toolkit`          | Metadata, structured data, sitemaps, and AI search |
| `content-modeling-best-practices` | `sanity-io/agent-toolkit`          | Modelling content types and fields in Sanity       |
| `portable-text-serialization`     | `sanity-io/agent-toolkit`          | Rendering Portable Text in React                   |

## Managing skills

Install or update a skill with the CLI, never by hand:

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code
```

Keep the installed skill folders in `.agents/skills/`. If an installer targets an agent-specific directory, use its option for the repository-wide `.agents/skills/` location or move the newly installed skill folder there; do not keep a second copy under `.claude/`. The `.claude/skills`, `.claude/agents`, and `.claude/rules` symlinks already expose them to Claude Code.

`modern-web-guidance` has its own CLI: `npx modern-web-guidance@latest update` updates it, and `npx modern-web-guidance@latest legacy-scan .` lists outdated patterns. The CLI sends anonymous usage data to Google unless `DISABLE_TELEMETRY=1` is set.

Skills are excluded from Prettier and ESLint, so their files stay identical to the source. `.gitattributes` marks them as vendored, so GitHub leaves them out of the language statistics.

## Rules and experts

`.agents/rules/` and `.agents/experts/` are this repository's own guidance, written by hand and formatted with Prettier. [`.agents/README.md`](../.agents/README.md) describes the rule format.

- **Rules** follow Chromium DevTools' `.agents/rules/`: one short file per trap, grouped into `frontend/`, `content/`, and `repo/`. Each file has a `name`, `rubric`, and `severity`, then sections for the rule, what to look for, what not to flag, why, and an example. Each rule also lists the files it covers in `paths`. `.claude/rules` is a symlink to `.agents/rules/`, so Claude Code loads a rule only when it reads or edits a matching file. `.rules` (`AGENTS.md`, `CLAUDE.md`) keeps a one-line summary of every rule with a link to its file, so agents that don't support path-scoped rules still see them.
- **Experts** are subagent definitions. `.claude/agents` is a symlink to `.agents/experts/`, so Claude Code loads them; other agents can read the files directly.

| Expert     | Use it for                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `reviewer` | Reviewing a branch or diff before a pull request. It picks the rules whose `paths` match the changed files and reports violations by severity. |

Add a rule or expert under the [rules hygiene](../.rules) in `.rules`: only for a trap an agent would plausibly fall into again, and in the same pull request as the code it guards.
