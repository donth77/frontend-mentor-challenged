<script lang="ts">
  import { onMount } from "svelte";
  import MoonIcon from "../assets/MoonIcon.svelte";

  const DARK = "dark",
    LIGHT = "light",
    THEME = "theme";
  let theme = "";

  function initializeTheme() {
    if (typeof localStorage !== "undefined" && localStorage.getItem(THEME)) {
      theme = localStorage.getItem(THEME) as "light" | "dark";
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = DARK;
    } else {
      theme = LIGHT;
    }
  }
  function toggleTheme() {
    document.documentElement.classList.toggle(DARK);

    if (theme === LIGHT) {
      theme = DARK;
      localStorage.setItem(THEME, DARK);
    } else {
      theme = LIGHT;
      localStorage.setItem(THEME, LIGHT);
    }
  }

  onMount(async () => {
    initializeTheme();
    if (theme === LIGHT) {
      document.documentElement.classList.remove(DARK);
    } else {
      document.documentElement.classList.add(DARK);
    }
  });
</script>

<button
  class="flex justify-center text-xs font-semibold text-cinder dark:text-white"
  on:click={toggleTheme}
>
  <span class="my-[-0.05rem] mr-2">
    <MoonIcon />
  </span>
  Dark Mode
</button>
