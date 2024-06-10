<script lang="ts">
  import markdownLogo from "../assets/Markdown-Logo.png";

  let isLoading = true;
</script>

<div
  class="loading-overlay animate-fadeOut pointer-events-none absolute z-10 flex h-full w-full items-center justify-center bg-caviar {isLoading
    ? ''
    : 'opacity-0'}"
  on:animationend={() => (isLoading = false)}
>
  <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
    <img class="" src={markdownLogo} alt="Markdown Logo" />
  </div>
</div>
