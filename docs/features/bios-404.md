# BIOS 404

Unknown routes render a not-found page styled after an AMI BIOS boot screen.

## Files

- `app/global-not-found.tsx`: the route. It is `noindex`, uses a dark-only viewport, and passes `dark` to `SharedWebLayout`.
- `features/bios/bios-screen.tsx`: the screen, a Server Component with the original palette as arbitrary Tailwind classes.
- `features/bios/bios-client.ts`: the browser-only parts: `RequestedRoute` shows the requested path and `RebootShortcut` registers the keys.
- `features/bios/reboot-keys.ts`: the reboot keys, their `aria-keyshortcuts` value, and the `isPlainKeyPress` filter, shared by the server and client parts.

## Keyboard shortcuts

Enter, Escape, and F1 go back to `/`. They are registered with UI SDK's `useShortcut`, which does not fire while focus is in a text field. `isPlainKeyPress` ignores repeated presses and presses with Shift, Control, Alt, or Command. The reboot link announces the keys through `aria-keyshortcuts="Enter Escape F1"`.

Never add handlers for character keys or pointer events on the whole page: they break scrolling, text selection, and screen reader keys (WCAG 2.1.4 and 2.5.2).

## Structure

The screen has its own landmarks: a `<header>` for the top bar, a `<main id="main">` with the boot log and the error as the page's `<h1>`, and a `<footer>` with the reboot link and `<kbd>` hints. Spacing in the route list comes from CSS, because Prettier collapses repeated spaces in JSX text.

## Testing

`features/bios/reboot-keys.test.ts` covers the key filter and the `aria-keyshortcuts` value. To check the real behaviour, see [Browser automation](browser-automation.md).
