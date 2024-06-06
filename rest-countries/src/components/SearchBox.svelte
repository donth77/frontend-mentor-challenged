<script lang="ts">
  import SearchIcon from "../assets/SearchIcon.svelte";

  export let searchText = "";

  function handleInput(event: Event) {
    searchText = (event?.target as HTMLInputElement)?.value;
  }
</script>

<div
  class="mb-10 flex h-12 w-full max-w-[30rem] items-center rounded-md bg-white pl-8 shadow-[0_2px_9px_0_rgba(0,0,0,0.05)] dark:bg-darkSlateGrey md:mb-12"
>
  <SearchIcon />
  <input
    class="ml-[1.625rem] w-full text-xs text-cinder placeholder-cloud focus:outline-none dark:bg-darkSlateGrey dark:text-white dark:placeholder-white"
    placeholder="Search for a country…"
    on:input={handleInput}
  />
</div>
