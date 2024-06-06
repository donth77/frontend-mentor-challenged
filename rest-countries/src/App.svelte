<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { ALL_ENDPOINT } from "./apiConstants";
  import type { Country } from "./types";
  import Header from "./components/Header.svelte";
  import SearchBox from "./components/SearchBox.svelte";
  import FilterSelect from "./components/FilterSelect.svelte";
  import CountryCard from "./components/CountryCard.svelte";
  import SelectedCountryInfo from "./components/SelectedCountryInfo.svelte";
  import CircleLoader from "./assets/CircleLoader.svelte";

  let isLoading = true;

  let allCountries: Country[] = [];
  let countries: Country[] = [];
  let searchText = "";
  let regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  let selectedRegionIdx: number | null = null;
  let prevSelectedCountry: Country | null = null;
  let selectedCountry: Country | null = null;

  setContext("selectedCountry", {
    setSelectedCountry,
    setSelectedCountryWithCode,
  });

  function setSelectedCountry(country: Country | null) {
    if (selectedCountry != null) {
      prevSelectedCountry = selectedCountry;
    }
    selectedCountry = country;
  }

  function setSelectedCountryWithCode(alpha3Code: string) {
    const country = allCountries.find(
      (country) => country.alpha3Code === alpha3Code,
    );

    if (country) {
      setSelectedCountry(country);
    }
  }

  $: {
    if (prevSelectedCountry != null && !selectedCountry) {
      // Reset state after back navigation
      prevSelectedCountry = null;
      if (searchText) {
        searchText = "";
      }
      if (selectedRegionIdx) {
        selectedRegionIdx = null;
      }
    }

    const selectedRegion =
      selectedRegionIdx != null ? regions[selectedRegionIdx] : null;

    countries = allCountries.filter(
      (country) =>
        (!selectedRegion || country.region === selectedRegion) &&
        country.name.toLowerCase().includes(searchText.toLowerCase()),
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
    isLoading = false;
  }

  onMount(fetchData);
</script>

<main class="absolute h-screen w-full bg-alabaster dark:bg-ebonyClay">
  <Header />
  {#if isLoading}
    <div class="flex h-1/2 w-full items-center justify-center">
      <CircleLoader />
    </div>
  {:else if selectedCountry}
    <div class="bg-alabaster px-7 py-10 dark:bg-ebonyClay">
      <SelectedCountryInfo countryData={selectedCountry} />
    </div>
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
        {#each countries as country}
          <CountryCard countryData={country} />
        {/each}
      </div>
    </div>
  {/if}
</main>
