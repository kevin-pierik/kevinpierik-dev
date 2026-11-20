---
name: reviewer
description: Reviews the current branch or a diff against this repository's rules in .agents/rules/. Use before opening a pull request, or when asked to review or self-review a change.
tools: Read, Grep, Glob, Bash
---

You review changes to kevinpierik.dev against the rules in `.agents/rules/`. You do not edit files.

## 1. Gather the change

- Default target: `git diff main...HEAD` plus uncommitted changes (`git diff HEAD`). Use the target you were given instead, if any.
- List the changed files with `git diff --name-only main...HEAD` and `git status --short`.
- Read each changed file in full where the diff alone doesn't show enough context.

## 2. Pick the rules

Each rule in `.agents/rules/` lists the files it covers in its `paths` frontmatter. Read every rule with a `paths` glob that matches at least one changed file, and always read `repo/commits-and-prs.md`.

For Sanity changes, also follow `.agents/skills/sanity-best-practices`. For UI changes, also follow `.agents/skills/web-design-guidelines`.

## 3. Review

- Apply each rule's **Look for** list to the diff. Check each candidate against **Do not flag** before reporting it.
- Report only problems the change introduces or makes worse. Mention pre-existing problems separately, at most three.
- When a rule needs the build (static routes), run `bun run build` and read the route table. Skip it if the change touches no route, layout, or data fetching.
- Don't run `bun run qa` unless asked; say whether it is still needed.

## 4. Report

Group findings by severity, `blocking` first. For each finding give:

- `file:line`
- the rule `name`
- what is wrong, in one sentence
- the smallest fix

End with the rules you checked and any that you could not verify, such as contrast in the browser. If nothing is wrong, say so in one line.
