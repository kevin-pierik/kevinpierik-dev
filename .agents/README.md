# .agents

Repository-level guidance for coding agents such as Claude Code, Codex, and Cursor.

- `skills/` holds vendored skills: on-demand expertise an agent loads when a task matches the skill's description. They are installed with the `skills` CLI and never edited by hand ([agent skills](../docs/agent-skills.md)).
- `rules/` holds this repository's review rules, grouped by area. Each file describes one trap: what to look for, what not to flag, and why. [`.rules`](../.rules) (also `AGENTS.md` and `CLAUDE.md`) lists every rule in one line and links here, so agents load the detail only when a change touches that area.
- `experts/` holds subagent definitions. `.claude/agents` links to this folder, `.claude/skills` to `skills/`, and `.claude/rules` to `rules/`, so Claude Code finds all three.

## Rule format

```markdown
---
name: frontend/static-routes
rubric: correctness
severity: blocking
paths:
  - "frontend/src/app/**"
---

# Title

**Rule.** One sentence.

## Look for

## Do not flag

## Why

## Example
```

- `name` is the path below `rules/` without `.md`.
- `rubric` is `correctness`, `accessibility`, `seo`, `testing`, or `process`.
- `paths` lists the globs, relative to the repository root, of files the rule applies to. Claude Code loads a rule only when it reads or edits a matching file, through the `.claude/rules` symlink. Every rule needs `paths`; a rule without it loads in every session.
- `severity` is `blocking` when a change must not merge with the violation, or `advisory` when it is a judgement call.

Keep a rule short and concrete. Explain how a feature works in `docs/` and link to it; the rule only names the trap.
