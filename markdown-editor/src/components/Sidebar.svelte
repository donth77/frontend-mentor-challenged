<script lang="ts">
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<aside
  class="absolute top-0 h-screen w-[250px] transform bg-inkwellInception p-6 transition duration-500 ease-in-out"
>
  <h1 class="mb-7 text-sm uppercase tracking-[0.125rem] text-adeptusBattlegrey">
    My Documents
  </h1>

  <button class="action-btn h-10 w-[202px]">+ New Document </button>

  <ThemeToggle />
</aside>
