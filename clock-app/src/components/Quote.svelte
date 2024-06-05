<script lang="ts">
  import { onMount } from "svelte";
  import RefreshIcon from "../assets/refresh.svelte";
  import classNames from "classnames";

  export let drawerActive = false;
  let isSpinning = false;
  let isRefreshing = false;

  let quote =
    "“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”";
  let author = "Ada Lovelace";

  function refreshQuote() {
    isSpinning = true;
    isRefreshing = true;

    setTimeout(() => {
      isSpinning = false;
      getQuote();
    }, 1000);

    setTimeout(() => {
      isRefreshing = false;
    }, 2000);
  }

  async function getQuote() {
    try {
      const resp = await fetch("https://api.quotable.io/random").then((r) =>
        r.json(),
      );
      quote = `“${resp.content}”`;
      author = resp.author;
    } catch (e) {
      console.error(e);
    }
  }

  onMount(getQuote);
</script>

<blockquote
  class={classNames(
    "flex flex-col transition-opacity duration-[400ms] sm:mt-12",
    {
      "opacity-0": drawerActive,
    },
  )}
>
  <div class="flex">
    <p
      class={classNames(
        "w-full max-w-[290px] text-xs leading-[1.375rem] text-white sm:max-w-[540px] sm:text-lg",
        {
          "animate-fadeOutIn": isRefreshing,
        },
      )}
    >
      {@html quote}
    </p>
    <button
      class="inline-flex"
      on:click={refreshQuote}
      aria-label="Refresh quote"
      ><span
        class={classNames("m-4 mt-1 sm:mt-2", {
          "animate-spin": isSpinning,
        })}
      >
        <RefreshIcon />
      </span></button
    >
  </div>
  <span
    class={classNames(
      "my-2 text-xs font-bold leading-[1.375rem] text-white sm:text-lg",
      {
        "animate-fadeOutIn": isRefreshing,
      },
    )}>{@html author}</span
  >
</blockquote>
