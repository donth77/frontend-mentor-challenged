<script lang="ts">
  import { getContext } from "svelte";
  import type { Country } from "../types";

  export let countryData: Country;

  const {
    setSelectedCountry,
  }: {
    setSelectedCountry: (country: Country | null) => void;
  } = getContext("selectedCountry");
</script>

<div
  class="h-[21rem] w-[16.5rem] rounded-md bg-white shadow-[0_0_7px_2px_rgba(0,0,0,0.03)] hover:cursor-pointer dark:bg-darkSlateGrey"
>
  <button
    title="Country Card Button"
    class="absolute h-[21rem] w-[16.5rem] rounded-md bg-black opacity-0 hover:opacity-10 dark:bg-white"
    on:click={() => setSelectedCountry(countryData)}
  />
  <img
    class="max-h-[10rem] w-[16.5rem] rounded-t-md object-cover"
    src={countryData.flag}
    alt="Flag of {countryData.name}"
  />
  <div class="p-6">
    <h1 class="mb-4 text-lg font-extrabold text-cinder dark:text-white">
      {countryData.name}
    </h1>
    <span class="text-sm text-cinder dark:text-white"
      ><b>Population:&nbsp;</b>{Number(
        countryData.population,
      ).toLocaleString()}</span
    >
    <br />
    <span class="text-sm text-cinder dark:text-white"
      ><b>Region:&nbsp;</b>{countryData.region}</span
    >
    <br />
    {#if countryData.capital}
      <span class="text-sm text-cinder dark:text-white"
        ><b>Capital:&nbsp;</b>{countryData.capital}</span
      >
    {/if}
  </div>
</div>
