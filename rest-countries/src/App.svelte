<script lang="ts">
  import Header from "./components/Header.svelte";
  import SearchBox from "./components/SearchBox.svelte";
  import FilterSelect from "./components/FilterSelect.svelte";
  import CountryCard from "./components/CountryCard.svelte";

  let regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  let selectedRegionIdx: number | null = null;

  $: {
    const selectedRegion =
      selectedRegionIdx != null ? regions[selectedRegionIdx] : null;
  }
</script>

<main class="absolute h-screen w-full bg-alabaster dark:bg-ebonyClay">
  <Header />
  <div
    class="h-screen w-full bg-alabaster px-4 py-6 dark:bg-ebonyClay md:px-20 md:py-12"
  >
    <div class="flex flex-col md:flex-row md:justify-between">
      <SearchBox />
      <FilterSelect options={regions} bind:selectedIdx={selectedRegionIdx} />
    </div>
    <div
      class="flex flex-col flex-wrap items-center gap-10 md:flex-row md:gap-x-[4.625rem] md:gap-y-[3.938rem]"
    >
      <CountryCard countryCode={"de"} />
      <CountryCard countryCode={"usa"} />
      <CountryCard countryCode={"br"} />
      <CountryCard countryCode={"is"} />'
    </div>
  </div>
</main>
