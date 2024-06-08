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
          class="duration-400 absolute block h-0.5 w-[30px] transform bg-white transition ease-in-out {sidebarOpen
            ? 'rotate-45'
            : ' -translate-y-2'}"
        ></span>
        <span
          aria-hidden="true"
          class="duration-400 absolute block h-0.5 w-[30px] transform bg-white transition ease-in-out {sidebarOpen
            ? 'opacity-0'
            : ''}"
        ></span>
        <span
          aria-hidden="true"
          class="duration-400 absolute block h-0.5 w-[30px] transform bg-white transition ease-in-out {sidebarOpen
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
      <button class="p-6" title="Delete button">
        <img src={trashIcon} alt="Delete Icon" />
      </button>
      <button class="action-btn mr-4 h-10 w-10 sm:w-[152px]">
        <img src={saveIcon} alt="Save Icon" />
        <span class="hidden sm:block">Save Changes</span></button
      >
    </div>
  </div>
</header>
