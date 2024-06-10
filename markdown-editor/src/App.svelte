<script lang="ts">
  import { onMount, setContext, onDestroy } from "svelte";
  import localforage from "localforage";
  import { Toaster } from "svelte-french-toast";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import MarkdownEditor from "./components/MarkdownEditor.svelte";
  import type { MarkdownDocument } from "./types";
  import {
    DEFAULT_DOC_TITLE,
    DEFAULT_DOC_BODY,
    CURRENT_DOC_KEY,
    LOAD_SIDEBAR_EVENT_STR,
  } from "./constants";
  import LoadingOverlay from "./components/LoadingOverlay.svelte";

  let sidebarOpen = false;
  let showDeleteBtn = false;

  let initialEditorContent: string = "";

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

  onMount(async () => {
    const dbSize = await localforage.length();

    if (dbSize === 0) {
      // Initialize default doc
      const defaultDoc: MarkdownDocument = {
        id: new Date().getTime(),
        title: DEFAULT_DOC_TITLE,
        body: DEFAULT_DOC_BODY,
      };

      localforage.setItem(CURRENT_DOC_KEY, defaultDoc);
      localforage.setItem(String(defaultDoc.id), defaultDoc);
      initialEditorContent = defaultDoc.body;

      await new Promise((r) => setTimeout(r, 0));
      const event = new CustomEvent(LOAD_SIDEBAR_EVENT_STR);
      window.dispatchEvent(event);
    } else {
      try {
        const currentDoc: MarkdownDocument | null =
          await localforage.getItem(CURRENT_DOC_KEY);
        if (currentDoc) {
          initialEditorContent = currentDoc.body;
        }
      } catch (err) {
        console.error(err);
      }
    }
    showDeleteBtn = dbSize > 2;

    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<Toaster />
<LoadingOverlay />
<Sidebar />
<div
  class="flex h-screen w-full transform flex-col transition duration-400 ease-in-out {sidebarOpen
    ? 'translate-x-[250px]'
    : ''}"
>
  <Header {sidebarOpen} {showDeleteBtn} />
  <main class="h-full bg-whiteSmoke">
    <MarkdownEditor content={initialEditorContent} />
  </main>
</div>
