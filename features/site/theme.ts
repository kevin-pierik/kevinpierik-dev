export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const themeStorageKey = "theme";

export const themeColors = { light: "#fff", dark: "#000" };

export function parseTheme(value: unknown): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

export const themeScript = `try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark"){var d=document,m=d.createElement("meta");d.documentElement.classList.add(t);m.name="theme-color";m.content=t==="dark"?"${themeColors.dark}":"${themeColors.light}";m.setAttribute("data-theme","");d.head.prepend(m)}}catch(e){}`;
