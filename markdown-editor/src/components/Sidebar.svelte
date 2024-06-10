<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import localforage from "localforage";
  import ThemeToggle from "./ThemeToggle.svelte";
  import {
    CURRENT_DOC_KEY,
    DEFAULT_DOC_TITLE,
    DEFAULT_DOC_BODY,
    DOC_RENAME_EVENT_STR,
    LOAD_SIDEBAR_EVENT_STR,
    SWITCH_DOC_EVENT_STR,
  } from "../constants";
  import type { MarkdownDocument } from "../types";
  import docIcon from "../assets/icon-document.svg";

  let currentDocId = "";
  let docs: MarkdownDocument[] = [];

  function loadSidebar() {
    docs = [];

    localforage
      .iterate(function (value, key, _) {
        const doc = value as MarkdownDocument;
        if (key != CURRENT_DOC_KEY) {
          docs = [...docs, doc];
        } else {
          currentDocId = String(doc.id);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  async function createNewDocument() {
    const newDoc: MarkdownDocument = {
      id: new Date().getTime(),
      title: DEFAULT_DOC_TITLE,
      body: DEFAULT_DOC_BODY,
    };

    localforage.setItem(CURRENT_DOC_KEY, newDoc);
    localforage.setItem(String(newDoc.id), newDoc);

    const event = new CustomEvent(SWITCH_DOC_EVENT_STR, {
      detail: newDoc,
    });
    await new Promise((r) => setTimeout(r, 0));
    window.dispatchEvent(event);
  }

  async function selectDocument(toDoc: MarkdownDocument) {
    if (currentDocId == String(toDoc.id)) {
      return;
    }
    localforage.setItem(CURRENT_DOC_KEY, toDoc);
    const event = new CustomEvent(SWITCH_DOC_EVENT_STR, {
      detail: toDoc,
    });
    await new Promise((r) => setTimeout(r, 0));
    window.dispatchEvent(event);
  }

  function handleRenameDocument(event: any) {
    const docId = event?.detail.key;
    const newTitle = event?.detail?.value;

    const oldDocs = docs;

    docs = [];

    oldDocs.forEach((oldDoc) => {
      if (oldDoc.id == docId) {
        docs = [
          ...docs,
          {
            ...oldDoc,
            title: newTitle,
          },
        ];
      } else {
        docs = [...docs, oldDoc];
      }
    });
  }

  onMount(() => {
    loadSidebar();

    window.addEventListener(LOAD_SIDEBAR_EVENT_STR, loadSidebar);
    window.addEventListener(SWITCH_DOC_EVENT_STR, loadSidebar);
    window.addEventListener(DOC_RENAME_EVENT_STR, handleRenameDocument);
  });

  onDestroy(() => {
    window.removeEventListener(LOAD_SIDEBAR_EVENT_STR, loadSidebar);
    window.removeEventListener(SWITCH_DOC_EVENT_STR, loadSidebar);
    window.removeEventListener(DOC_RENAME_EVENT_STR, handleRenameDocument);
  });
</script>

<aside
  class="absolute top-0 h-screen w-[250px] transform bg-inkwellInception py-6 transition duration-500 ease-in-out"
>
  <h1
    class="mb-7 px-6 text-sm uppercase tracking-[0.125rem] text-adeptusBattlegrey"
  >
    My Documents
  </h1>
  <button class="action-btn mx-6 h-10 w-[202px]" on:click={createNewDocument}
    >+ New Document
  </button>
  <div
    class="sidebar-scrollbar flex h-[85%] flex-col gap-y-6 overflow-y-auto p-6"
  >
    {#each docs as doc}
      <button class="group text-left" on:click={() => selectDocument(doc)}>
        <div class=" flex">
          <div class="mr-4 flex min-w-[14px] items-center">
            <img src={docIcon} alt="Document Icon" />
          </div>
          <div class="flex flex-col">
            <span class="text-[0.813rem] font-light text-adeptusBattlegrey"
              >{Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                new Date(doc.id),
              )}</span
            >
            <span
              class="w-[185px] overflow-hidden text-ellipsis text-[0.938rem] group-hover:text-emergencyZone {String(
                doc.id,
              ) == currentDocId
                ? 'text-emergencyZone'
                : 'text-white'}"
              title={doc.title}>{doc.title}</span
            >
          </div>
        </div>
      </button>
    {/each}
  </div>
  <ThemeToggle />
</aside>
