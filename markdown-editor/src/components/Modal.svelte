<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  export let open = false;
  export let title = "";
  export let confirmText = "Confirm";
  export let cancelText = "Cancel";
  const dispatch = createEventDispatcher();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      dispatch("close");
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<div
  class="modal fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-8 lg:p-0 {open
    ? ''
    : 'hidden'}"
>
  <div class="modal-overlay fixed h-full w-full bg-gray-900 opacity-50"></div>
  <div
    class="z-50 mx-auto flex min-h-[218px] w-full flex-col justify-between overflow-y-auto rounded bg-white shadow-xl dark:bg-inkwellInception sm:h-max sm:w-1/2 md:w-1/3"
  >
    <div>
      <div
        class="head flex items-center justify-between px-6 py-5 text-xl font-bold text-antarcticDeep dark:text-white"
      >
        {title}
        <button
          aria-label="Close button"
          class="ml-4"
          on:click={() => dispatch("close")}
        >
          <svg
            class="fill-antarcticDeep dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            /></svg
          >
        </button>
      </div>
      <div class="content px-6 pb-6 text-adeptusBattlegrey dark:text-ashBlue">
        <slot name="body" />
      </div>
    </div>
    <div class="mb-6 flex w-full justify-end gap-3 px-6">
      <button
        aria-label="Cancel button"
        class="action-btn h-10 w-20 border border-antarcticDeep bg-white text-antarcticDeep hover:bg-gray-100 dark:border-white dark:bg-inkwellInception dark:text-white dark:hover:bg-gray-800"
        on:click={() => dispatch("close")}>{cancelText}</button
      >
      <button class="action-btn h-10 w-20" on:click={() => dispatch("confirm")}
        >{confirmText}</button
      >
    </div>
  </div>
</div>
