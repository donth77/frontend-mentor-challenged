<script lang="ts">
  import SearchIcon from "../assets/SearchIcon.svelte";
</script>

<div
  class="mb-10 flex h-12 w-full max-w-[30rem] items-center rounded-md bg-white pl-8 shadow-[0_2px_9px_0_rgba(0,0,0,0.05)] dark:bg-darkSlateGrey md:mb-12"
>
  <SearchIcon />
  <input
    class="placeholder-cloud ml-[1.625rem] text-xs text-cinder focus:outline-none dark:bg-darkSlateGrey dark:text-white dark:placeholder-white"
    placeholder="Search for a country…"
  />
</div>
