<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { CODE_ENDPOINT } from "../apiConstants";
  import type { Country } from "../types";

  export let countryCode = "";

  const {
    setSelectedCountry,
  }: {
    setSelectedCountry: (country: Country) => void;
  } = getContext("selectedCountry");

  let isLoading = true;

  let flagSrc: string,
    countryName: string,
    population: number,
    region: string,
    capital: string,
    thisCountry: Country;

  async function fetchData() {
    try {
      const resp = await fetch(`${CODE_ENDPOINT}/${countryCode}`);
      const json = await resp.json();

      thisCountry = json;
      flagSrc = json.flag;
      countryName = json.name;
      population = json.population;
      region = json.region;
      capital = json.capital;
    } catch (e) {
      console.error(e);
    }

    isLoading = false;
  }

  onMount(fetchData);
</script>

<div
  class="h-[21rem] w-[16.5rem] rounded-md bg-white shadow-[0_0_7px_2px_rgba(0,0,0,0.03)] hover:cursor-pointer dark:bg-darkSlateGrey"
>
  {#if !isLoading}
    <button
      class="absolute h-[21rem] w-[16.5rem] rounded-md bg-black opacity-0 hover:opacity-10 dark:bg-white"
      on:click={() => setSelectedCountry(thisCountry)}
    />
    <img
      class="max-h-[10rem] w-[16.5rem] rounded-t-md object-cover"
      src={flagSrc}
      alt="Flag of {countryName}"
    />
    <div class="p-6">
      <h1 class="mb-4 text-lg font-extrabold text-cinder dark:text-white">
        {countryName}
      </h1>
      <span class="text-sm text-cinder dark:text-white"
        ><b>Population:&nbsp;</b>{Number(population).toLocaleString()}</span
      >
      <br />
      <span class="text-sm text-cinder dark:text-white"
        ><b>Region:&nbsp;</b>{region}</span
      >
      <br />
      {#if capital}
        <span class="text-sm text-cinder dark:text-white"
          ><b>Capital:&nbsp;</b>{capital}</span
        >
      {/if}
    </div>
  {/if}
</div>
