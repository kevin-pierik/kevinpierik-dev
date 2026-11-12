# Browser automation

[agent-browser](https://github.com/vercel-labs/agent-browser) is a dev dependency that lets you, or an agent, check the site in a real browser.

## Setup

```bash
bunx agent-browser install
```

This downloads its own Chrome to `~/.agent-browser/`.

## Examples

Build and start the site, then:

```bash
bunx agent-browser open http://localhost:3000/does-not-exist
bunx agent-browser press F1
bunx agent-browser get url
bunx agent-browser a11y http://localhost:3000/ --tags wcag2a,wcag2aa,wcag21aa,wcag22aa,best-practice
bunx agent-browser close
```

The `a11y` command runs an axe-core audit. The one known violation is `target-size` on the header's social links.
