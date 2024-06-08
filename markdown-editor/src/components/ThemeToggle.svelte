<script lang="ts">
  import { onMount } from "svelte";
  import moonIcon from "../assets/icon-dark-mode.svg";
  import sunIcon from "../assets/icon-light-mode.svg";

  const DARK = "dark",
    LIGHT = "light",
    THEME = "theme";

  let theme = LIGHT;

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

<div class="absolute bottom-0 mb-6 flex gap-[0.625rem]">
  <img class="w-6" src={moonIcon} alt="Dark Mode Icon" />
  <button
    title="Theme Toggle"
    class="flex h-6 w-12 items-center rounded-[0.906rem] bg-blueSlate px-[0.375rem]"
    on:click={toggleTheme}
  >
    <div
      class="duration-400 h-3 w-3 transform rounded-full bg-white transition {theme ===
      LIGHT
        ? 'translate-x-6'
        : ''}"
    ></div>
  </button>
  <img class="w-6 fill-white" src={sunIcon} alt="Light Mode Icon" />
</div>
