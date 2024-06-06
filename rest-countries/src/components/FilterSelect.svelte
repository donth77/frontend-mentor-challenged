<script lang="ts">
  import CaretIcon from "../assets/CaretIcon.svelte";

  export let options: string[] = [];
  export let selectedIdx: number | null = null;

  const placeholderText = "Filter by Region";
  const classesRemoveOnSelect = ["dark:text-white"];
  const selectedClasses = ["text-red-500", "dark:text-red-500"];
  let optionEls: (HTMLElement | null)[] = new Array(options.length).fill(null);
  let selectTextEl: HTMLElement;

  function handleClickOption(event: MouseEvent, index: number) {
    const targetEl = event?.target as HTMLElement;

    if (targetEl) {
      if (index === selectedIdx) {
        selectTextEl.innerText = placeholderText;
        selectedIdx = null;
        targetEl.classList.remove(...selectedClasses);
        targetEl.classList.add(...classesRemoveOnSelect);
        targetEl.blur();
        return;
      }
      selectTextEl.innerText = targetEl.innerText;
      selectedIdx = index;

      // Mark selected option
      targetEl.classList.remove(...classesRemoveOnSelect);
      targetEl.classList.add(...selectedClasses);
      for (let i = 0; i < optionEls.length; i++) {
        if (i != index) {
          optionEls[i]?.classList.remove(...selectedClasses);
          optionEls[i]?.classList.add(...classesRemoveOnSelect);
        }
      }

      targetEl.blur(); // close
    }
  }
</script>

<div class="group relative z-10 mb-8 inline-block md:mb-0 md:ml-4">
  <button
    class="shadotext-w-[0_2px_9px_0_rgba(0,0,0,0.05)] flex h-[48px] w-[200px] items-center justify-between rounded-md bg-white p-2 px-6 text-left text-xs font-normal text-cinder focus:outline-none dark:bg-darkSlateGrey dark:text-white"
    ><span bind:this={selectTextEl}>{placeholderText}</span>
    <CaretIcon />
  </button>
  <div
    class="z-1 absolute mt-1 hidden w-[200px] animate-slideIn list-none rounded-md bg-white py-2 shadow-lg group-focus-within:block dark:bg-darkSlateGrey"
  >
    {#each options as option, index}
      <button
        bind:this={optionEls[index]}
        class="flex h-7 w-full cursor-pointer items-center px-6 text-xs text-cinder hover:bg-gray-200 hover:text-blue-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-blue-400"
        on:click={(event) => handleClickOption(event, index)}
      >
        {option}
      </button>
    {/each}
  </div>
</div>
