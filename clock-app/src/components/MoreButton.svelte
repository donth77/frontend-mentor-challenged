<script>
  import MoreIcon from "../assets/more.svelte";
  import LessIcon from "../assets/less.svelte";
  import More from "../assets/more.svelte";

  export let active = false;
  export let onClick = () => {};
  let hover = false;
</script>

<button
  class="flex h-[2.438rem] w-[7.188rem] items-center justify-center rounded-[1.75rem] bg-white pl-[1.063rem] pr-1 sm:h-[3.5rem] sm:w-[9.125rem] xl:-mb-[8.125rem]"
  on:click={onClick}
  on:mouseenter={() => (hover = true)}
  on:mouseleave={() => (hover = false)}
>
  <span
    class="mr-[0.75rem] text-xs font-bold uppercase tracking-[0.234rem] text-black opacity-50 sm:text-base"
  >
    {#if active}
      Less
    {:else}
      More
    {/if}</span
  >
  {#if active}
    <LessIcon fill={hover ? "#999" : "#303030"} />
  {:else}
    <MoreIcon fill={hover ? "#999" : "#303030"} />
  {/if}
</button>
