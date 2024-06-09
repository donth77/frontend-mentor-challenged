<script lang="ts">
  import { getContext } from "svelte";

  import docIcon from "../assets/icon-document.svg";
  import trashIcon from "../assets/icon-delete.svg";
  import saveIcon from "../assets/icon-save.svg";

  const {
    onHeaderClick,
  }: {
    onHeaderClick: () => void;
  } = getContext("openSidebar");

  export let sidebarOpen = false;
</script>

<header class="flex h-[72px] bg-caviar">
  <div class="flex w-full justify-between">
    <div class="flex">
      <button
        class="flex h-full w-[72px] items-center justify-center bg-antarcticDeep text-gray-500 hover:bg-emergencyZone focus:outline-none"
        on:click={onHeaderClick}
      >
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-[30px] transform bg-white transition duration-400 ease-in-out {sidebarOpen
            ? 'rotate-45'
            : ' -translate-y-2'}"
        ></span>
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-[30px] transform bg-white transition duration-400 ease-in-out {sidebarOpen
            ? 'opacity-0'
            : ''}"
        ></span>
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-[30px] transform bg-white transition duration-400 ease-in-out {sidebarOpen
            ? '-rotate-45'
            : ' translate-y-2'}"
        ></span>
      </button>
      <div class="hidden w-[184px] items-center justify-center sm:flex">
        <span
          class="font-commissioner text-[0.938rem] font-bold uppercase tracking-[0.313rem] text-white"
          >Markdown</span
        >
      </div>
      <div class="hidden w-[1px] items-center sm:flex">
        <div class="h-10 w-full bg-blueSlate"></div>
      </div>
      <div class="flex items-center pl-6">
        <img src={docIcon} alt="Document Icon" />
        <div class="ml-4 flex flex-col">
          <span
            class="hidden text-[0.813rem] font-light text-adeptusBattlegrey sm:block"
            >Document Name</span
          >
          <span class="text-[0.938rem] text-white">welcome.md</span>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button class="group p-6" title="Delete button">
        <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"
          ><path
            class="fill-adeptusBattlegrey group-hover:fill-emergencyZone"
            d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
          /></svg
        >
      </button>
      <button class="action-btn mr-4 hidden h-10 w-10 sm:w-[152px]">
        <img src={saveIcon} alt="Save Icon" />
        <span class="hidden sm:block">Save Changes</span></button
      >
    </div>
  </div>
</header>
