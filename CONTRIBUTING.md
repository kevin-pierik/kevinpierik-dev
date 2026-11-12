# Contributing

This is the source of a personal website, so most changes come from its owner. Bug reports and small fixes are welcome; open an issue before you start on anything larger.

## Workflow

1. Branch off `main` with a short kebab-case name for the area you change, such as `bios-shortcuts`.
2. Commit in the style `area: Description`, imperative and sentence case, for example `home: Add GitHub link`.
3. Run `bun run format` and `bun run qa` before you push.
4. Open a pull request using the template. Pull requests are squash-merged into `main`.

`main` is protected: it only changes through pull requests.

The full conventions for code, content, and accessibility live in [`.rules`](.rules).
