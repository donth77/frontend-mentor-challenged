<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import localforage from "localforage";
  import ace, { edit } from "brace";
  import "brace/mode/markdown";
  import "brace/theme/chrome";
  import "brace/theme/twilight";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import toast from "svelte-french-toast";
  import type { MarkdownDocument } from "../types";
  import {
    SWITCH_DOC_EVENT_STR,
    CURRENT_DOC_KEY,
    LIGHT_STR,
    SAVE_CHANGES_EVENT_STR,
    THEME_CHANGE_EVENT_STR,
  } from "../constants";

  export let content: string;

  const ACE_LIGHT_THEME = "ace/theme/chrome";
  const ACE_DARK_THEME = "ace/theme/twilight";

  let editor: ace.Editor;
  let previewHtml = "";
  let showPreview = false;

  function toggleShowPreview() {
    showPreview = !showPreview;
  }

  async function renderEditorContent() {
    const markdown = editor.getValue();
    const html = await marked.parse(markdown);
    const htmlWithBreak = html + "<br />";
    const sanitizedHtml = DOMPurify.sanitize(htmlWithBreak);

    previewHtml = sanitizedHtml;
  }

  function handleChangeTheme(event: any) {
    const newTheme = event?.detail;
    if (newTheme === LIGHT_STR) {
      editor.setTheme(ACE_LIGHT_THEME);
    } else {
      editor.setTheme(ACE_DARK_THEME);
    }
  }

  async function handleSaveChanges() {
    try {
      const currentDoc: MarkdownDocument | null =
        await localforage.getItem(CURRENT_DOC_KEY);

      if (currentDoc) {
        const newDoc = {
          ...currentDoc,
          body: editor.getValue(),
        };
        localforage.setItem(CURRENT_DOC_KEY, newDoc);
        localforage.setItem(String(currentDoc.id), newDoc);

        toast.success("Saved 🎉");
      }
    } catch (err) {
      console.error(err);

      toast.error("Failed to save 😟");
    }
  }

  function handleSwitchDocument(event: any) {
    const newDoc: MarkdownDocument = event?.detail;
    const newContent = newDoc.body;
    if (editor) {
      editor.setValue(newContent, -1);
    }
  }

  $: {
    if (editor) {
      editor.setValue(content, -1);
    }
  }

  onMount(async () => {
    editor = ace.edit("braceEditor");
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/markdown");

    const theme = localStorage.getItem("theme");
    if (theme === LIGHT_STR) {
      editor.setTheme(ACE_LIGHT_THEME);
    } else {
      editor.setTheme(ACE_DARK_THEME);
    }

    editor.setOptions({
      fontFamily: "Roboto Mono",
      fontSize: "12pt",
      wrap: true,
      wrapMethod: "text",
    });

    editor.setValue(content, -1);
    // editor.focus();
    await renderEditorContent();

    editor.addEventListener("change", renderEditorContent);
    window.addEventListener(THEME_CHANGE_EVENT_STR, handleChangeTheme);
    window.addEventListener(SAVE_CHANGES_EVENT_STR, handleSaveChanges);
    window.addEventListener(SWITCH_DOC_EVENT_STR, handleSwitchDocument);
  });

  onDestroy(() => {
    editor.removeEventListener("change", renderEditorContent);
    window.removeEventListener(THEME_CHANGE_EVENT_STR, handleChangeTheme);
    window.removeEventListener(SAVE_CHANGES_EVENT_STR, handleSaveChanges);
    window.removeEventListener(SWITCH_DOC_EVENT_STR, handleSwitchDocument);
  });
</script>

<div
  class="flex bg-white dark:bg-sooty {showPreview
    ? 'justify-center overflow-y-scroll'
    : ''}"
>
  <div
    class="w-full border-r border-titaniumWhite dark:border-blueSlate sm:w-1/2 {showPreview
      ? 'hidden'
      : ''}"
  >
    <div
      class="flex h-[42px] justify-between bg-whiteSmoke px-4 py-3 dark:bg-inkwellInception"
    >
      <h2
        class="text-sm font-medium uppercase tracking-[0.125rem] text-adeptusBattlegrey dark:text-ashBlue"
      >
        Markdown
      </h2>
      <button
        class="group flex h-full w-6 items-center justify-center sm:hidden"
        title="Show Preview"
        on:click={toggleShowPreview}
      >
        {#if showPreview}
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"
            ><path
              class="fill-adeptusBattlegrey group-hover:fill-emergencyZone dark:fill-ashBlue"
              d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z"
            /></svg
          >
        {:else}
          <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"
            ><path
              class="fill-adeptusBattlegrey group-hover:fill-emergencyZone dark:fill-ashBlue"
              d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"
            /></svg
          >
        {/if}
      </button>
    </div>

    <div id="braceEditor" class="editor h-[87.2vh] w-full"></div>
  </div>
  <div
    class=" {showPreview
      ? 'w-full'
      : 'hidden w-1/2'} bg-white dark:bg-sooty sm:block"
  >
    <div
      class="flex h-[42px] justify-between bg-whiteSmoke px-4 py-3 dark:bg-inkwellInception"
    >
      <h2
        class="text-sm font-medium uppercase tracking-[0.125rem] text-adeptusBattlegrey dark:text-ashBlue"
      >
        Preview
      </h2>
      <button
        class="group flex h-full w-6 items-center justify-center"
        title="Show Preview"
        on:click={toggleShowPreview}
      >
        {#if showPreview}
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"
            ><path
              class="fill-adeptusBattlegrey group-hover:fill-emergencyZone dark:fill-ashBlue"
              d="M1.38.027a.795.795 0 0 1 .769.206L14.815 12.9a.792.792 0 0 1 0 1.124.792.792 0 0 1-1.124 0L9.234 9.567a2.77 2.77 0 0 1-3.753-3.753L1.024 1.357a.795.795 0 0 1 .357-1.33Zm.998 3.832 1.156 1.116a10.846 10.846 0 0 0-1.773 2.153c.696 1.117 2.929 4.038 6.333 3.959a6.127 6.127 0 0 0 1.346-.198l1.25 1.25a7.505 7.505 0 0 1-2.556.53h-.198c-4.663 0-7.331-4.282-7.83-5.145a.792.792 0 0 1 0-.792A12.58 12.58 0 0 1 2.378 3.86Zm5.328-2.272c4.726-.143 7.52 4.267 8.028 5.145.15.24.163.542.031.792a12.58 12.58 0 0 1-2.304 2.874l-1.195-1.116a10.846 10.846 0 0 0 1.813-2.154c-.705-1.116-2.937-4.045-6.333-3.958a6.127 6.127 0 0 0-1.346.198L5.149 2.117a7.505 7.505 0 0 1 2.557-.53Zm-.974 5.486v.055c0 .656.532 1.188 1.188 1.188l.047-.008-1.235-1.235Z"
            /></svg
          >
        {:else}
          <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"
            ><path
              class="fill-adeptusBattlegrey group-hover:fill-emergencyZone dark:fill-ashBlue"
              d="M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z"
            /></svg
          >
        {/if}
      </button>
    </div>
    <div class={showPreview ? "flex justify-center" : ""}>
      <div class={showPreview ? "w-full md:w-2/3 lg:w-1/2" : ""}>
        <div
          class="preview-html h-[87.2vh] p-6 {showPreview
            ? ''
            : 'overflow-y-scroll'}"
        >
          {@html previewHtml}
        </div>
      </div>
    </div>
  </div>
</div>
