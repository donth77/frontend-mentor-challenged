<script lang="ts">
  import { onMount, setContext, onDestroy } from "svelte";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import MarkdownEditor from "./components/MarkdownEditor.svelte";

  let sidebarOpen = false;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (sidebarOpen) {
        sidebarOpen = false;
      }
    }
  }

  function onHeaderClick() {
    sidebarOpen = !sidebarOpen;
  }

  setContext("openSidebar", {
    onHeaderClick,
  });

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<Sidebar />

<div
  class="flex h-screen w-full transform flex-col transition duration-400 ease-in-out {sidebarOpen
    ? 'translate-x-[250px]'
    : ''}"
>
  <Header {sidebarOpen} />
  <main class="h-full bg-whiteSmoke">
    <MarkdownEditor />
  </main>
</div>
