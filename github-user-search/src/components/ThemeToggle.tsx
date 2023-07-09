import { createEffect, createSignal } from "solid-js";
import MoonIcon from "../assets/icon-moon.svg";
import SunIcon from "../assets/icon-sun.svg";

const DARK = "dark";
const LIGHT = "light";
const THEME = "theme";

const initializeTheme = () => {
  let theme;
  if (typeof localStorage !== "undefined" && localStorage.getItem(THEME)) {
    theme = localStorage.getItem(THEME) as "light" | "dark";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = DARK;
  } else {
    theme = LIGHT;
  }
  return theme;
};

const ThemeToggle = () => {
  const [theme, setTheme] = createSignal<string>(initializeTheme());

  createEffect(() => {
    const root = document.documentElement;
    if (theme() === LIGHT) {
      root.classList.remove(DARK);
      localStorage.setItem(THEME, LIGHT);
    } else {
      root.classList.add(DARK);
      localStorage.setItem(THEME, DARK);
    }
  });

  return (
    <button
      onClick={() => setTheme((t) => (t === LIGHT ? DARK : LIGHT))}
      class="flex items-center group"
    >
      <span class="font-bold text-[0.813rem] tracking-[0.156rem] dark:text-white text-slateGrey uppercase mr-4 group-hover:text-charleston group-hover:dark:text-ceil">
        {theme()}
      </span>
      <span class="dark:fill-white fill-slateGrey group-hover:fill-charleston group-hover:dark:fill-ceil">
        {theme() === LIGHT ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
