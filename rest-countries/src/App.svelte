<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { ALL_ENDPOINT } from "./apiConstants";
  import type { Country } from "./types";
  import Header from "./components/Header.svelte";
  import SearchBox from "./components/SearchBox.svelte";
  import FilterSelect from "./components/FilterSelect.svelte";
  import CountryCard from "./components/CountryCard.svelte";
  import SelectedCountryInfo from "./components/SelectedCountryInfo.svelte";

  let allCountries: Country[] = [];
  let countries: Country[] = [];
  let searchText = "";
  let regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let selectedRegionIdx: number | null = null;
  let selectedCountry: Country | null = null;

  setContext("selectedCountry", { setSelectedCountry });

  function setSelectedCountry(country: Country) {
    selectedCountry = country;
  }

  $: {
    const selectedRegion =
      selectedRegionIdx != null ? regions[selectedRegionIdx] : null;

    countries = allCountries.filter(
      (country) =>
        (!selectedRegion || country.region === selectedRegion) &&
        (country.name.toLowerCase().includes(searchText.toLowerCase()) ||
          country.nativeName.toLowerCase().includes(searchText.toLowerCase())),
    );
  }

  async function fetchData() {
    try {
      const resp = await fetch(`${ALL_ENDPOINT}`);
      const allCountriesJson = await resp.json();

      allCountries = allCountriesJson;
    } catch (e) {
      console.error(e);
    }
  }

  onMount(fetchData);
</script>

<main class="absolute h-screen w-full bg-alabaster dark:bg-ebonyClay">
  <Header />
  {#if selectedCountry}
    <SelectedCountryInfo countryData={selectedCountry} />
  {:else}
    <div
      class="w-full bg-alabaster px-4 py-6 dark:bg-ebonyClay md:px-20 md:py-12"
    >
      <div class="flex flex-col md:flex-row md:justify-between">
        <SearchBox bind:searchText />
        <FilterSelect options={regions} bind:selectedIdx={selectedRegionIdx} />
      </div>
      <div
        class="flex flex-col flex-wrap items-center gap-10 md:flex-row md:gap-x-[4rem] md:gap-y-[3.938rem]"
      >
        {#each countries as country (country.alpha3Code)}
          <CountryCard countryCode={country.alpha3Code} />
        {/each}
      </div>
    </div>
  {/if}
</main>
