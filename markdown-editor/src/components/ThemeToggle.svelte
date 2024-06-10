<script lang="ts">
  import { onMount } from "svelte";
  import moonIcon from "../assets/icon-dark-mode.svg";
  import sunIcon from "../assets/icon-light-mode.svg";
  import {
    DARK_STR,
    LIGHT_STR,
    THEME_CHANGE_EVENT_STR,
    THEME_STR,
  } from "../constants";

  let theme = LIGHT_STR;

  function initializeTheme() {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem(THEME_STR)
    ) {
      theme = localStorage.getItem(THEME_STR) as "light" | "dark";
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = DARK_STR;
    } else {
      theme = LIGHT_STR;
    }
  }

  function toggleTheme() {
    document.documentElement.classList.toggle(DARK_STR);

    if (theme === LIGHT_STR) {
      theme = DARK_STR;
      localStorage.setItem(THEME_STR, DARK_STR);
    } else {
      theme = LIGHT_STR;
      localStorage.setItem(THEME_STR, LIGHT_STR);
    }

    const event = new CustomEvent(THEME_CHANGE_EVENT_STR, {
      detail: theme,
    });
    window.dispatchEvent(event);
  }

  onMount(async () => {
    initializeTheme();
    if (theme === LIGHT_STR) {
      document.documentElement.classList.remove(DARK_STR);
    } else {
      document.documentElement.classList.add(DARK_STR);
    }
  });
</script>

<div class="absolute bottom-0 mx-6 mb-6 flex gap-[0.625rem]">
  <img class="w-6" src={moonIcon} alt="Dark Mode Icon" />
  <button
    title="Theme Toggle"
    class="flex h-6 w-12 items-center rounded-[0.906rem] bg-blueSlate px-[0.375rem]"
    on:click={toggleTheme}
  >
    <div
      class="h-3 w-3 transform rounded-full bg-white transition duration-400 {theme ===
      LIGHT_STR
        ? 'translate-x-6'
        : ''}"
    ></div>
  </button>
  <img class="w-6 fill-white" src={sunIcon} alt="Light Mode Icon" />
</div>
