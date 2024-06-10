<script lang="ts">
  import { onMount, onDestroy, getContext } from "svelte";
  import localforage from "localforage";
  import Modal from "./Modal.svelte";
  import {
    SWITCH_DOC_EVENT_STR,
    CURRENT_DOC_KEY,
    DEFAULT_DOC_TITLE,
    DOC_RENAME_EVENT_STR,
    SAVE_CHANGES_EVENT_STR,
  } from "../constants";
  import type { MarkdownDocument } from "../types";
  import docIcon from "../assets/icon-document.svg";
  import saveIcon from "../assets/icon-save.svg";

  const {
    onHeaderClick,
  }: {
    onHeaderClick: () => void;
  } = getContext("openSidebar");

  export let sidebarOpen = false;
  export let docTitle = "";
  export let showDeleteBtn = false;
  let isTitleFocused = false;
  let showModal = false;

  async function updateCurrentDocTitle(newTitle: string) {
    try {
      const currentDoc: MarkdownDocument | null =
        await localforage.getItem(CURRENT_DOC_KEY);

      if (currentDoc) {
        const newDoc = {
          ...currentDoc,
          title: newTitle,
        };
        localforage.setItem(CURRENT_DOC_KEY, newDoc);
        localforage.setItem(String(currentDoc.id), newDoc);

        const event = new CustomEvent(DOC_RENAME_EVENT_STR, {
          detail: { key: currentDoc.id, value: newTitle },
        });
        window.dispatchEvent(event);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function saveChangesToCurrentDocument() {
    const event = new CustomEvent(SAVE_CHANGES_EVENT_STR);
    window.dispatchEvent(event);
  }

  async function deleteCurrentDocument() {
    console.log("deleteCurrentDocument");
    showModal = false;
    try {
      const currentDoc: MarkdownDocument | null =
        await localforage.getItem(CURRENT_DOC_KEY);

      if (currentDoc) {
        // Delete the current doc
        await localforage.removeItem(String(currentDoc.id));

        // Find new document and switch to it
        await localforage
          .iterate(function (value, key, iterationNumber) {
            if (key != CURRENT_DOC_KEY) {
              return value;
            }
          })
          .then(async function (newDoc) {
            console.log("Deleted then found new doc to switch to:");
            console.log(newDoc);

            const dbSize = await localforage.length();
            console.log(`dbSize: ${dbSize}`);
            showDeleteBtn = dbSize > 2;

            localforage.setItem(CURRENT_DOC_KEY, newDoc);
            const event = new CustomEvent(SWITCH_DOC_EVENT_STR, {
              detail: newDoc,
            });
            await new Promise((r) => setTimeout(r, 0));
            window.dispatchEvent(event);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleRenameInput(event: Event) {
    console.log(event);
    const newTitle = (event?.target as HTMLInputElement)?.value.trim();
    console.log(newTitle);
    console.log(newTitle.length);
    if (newTitle) {
      updateCurrentDocTitle(newTitle);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === "Escape") {
      (event?.target as HTMLElement)?.blur();
    }
  }

  function handleSwitchDocument(event: any) {
    const newDoc: MarkdownDocument = event?.detail;

    docTitle = newDoc.title;
  }

  onMount(async () => {
    try {
      const currentDoc: MarkdownDocument | null =
        await localforage.getItem(CURRENT_DOC_KEY);

      if (currentDoc) {
        docTitle = currentDoc.title;
      } else {
        docTitle = DEFAULT_DOC_TITLE;
      }
    } catch (err) {
      console.error(err);
    }

    window.addEventListener(SWITCH_DOC_EVENT_STR, handleSwitchDocument);
  });

  onDestroy(() => {
    window.removeEventListener(SWITCH_DOC_EVENT_STR, handleSwitchDocument);
  });
</script>

<Modal
  title="Delete this document?"
  open={showModal}
  confirmText="Delete"
  cancelText="Cancel"
  on:close={() => (showModal = false)}
  on:confirm={deleteCurrentDocument}
>
  <svelte:fragment slot="body">
    Are you sure you want to delete ‘{docTitle}’ document and its contents? This
    action cannot be reversed.
  </svelte:fragment>
</Modal>

<header class="flex h-[72px] bg-caviar">
  <div class="flex w-full justify-between">
    <div class="flex w-full">
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
      <div class="flex items-center pl-6 md:w-1/2 lg:w-1/3">
        <img src={docIcon} alt="Document Icon" />
        <div class="ml-4 flex w-full flex-col">
          <span
            class="hidden text-[0.813rem] font-light text-adeptusBattlegrey sm:block"
            >Document Name</span
          >
          <input
            class="w-full border-b bg-caviar text-[0.938rem] text-white caret-emergencyZone focus:outline-none {isTitleFocused
              ? 'border-white'
              : 'border-transparent'}"
            value={docTitle}
            on:keydown={handleKeydown}
            on:input={handleRenameInput}
            on:focus={() => (isTitleFocused = true)}
            on:blur={() => (isTitleFocused = false)}
          />
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button
        class="group p-6 {showDeleteBtn ? '' : 'hidden'}"
        aria-label="Delete button"
        on:click={() => (showModal = true)}
      >
        <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"
          ><path
            class="fill-adeptusBattlegrey group-hover:fill-emergencyZone"
            d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
          /></svg
        >
      </button>
      <button
        class="action-btn mr-4 h-10 w-10 sm:w-[152px]"
        on:click={saveChangesToCurrentDocument}
      >
        <img src={saveIcon} alt="Save Icon" />
        <span class="hidden sm:block">Save Changes</span></button
      >
    </div>
  </div>
</header>
