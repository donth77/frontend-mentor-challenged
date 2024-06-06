<script lang="ts">
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<div
  class="flex h-20 w-full items-center justify-between bg-white px-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.06)] dark:bg-darkSlateGrey md:px-20"
>
  <h1 class="text-xl font-extrabold text-cinder dark:text-white">
    Where in the world?
  </h1>
  <ThemeToggle />
</div>
