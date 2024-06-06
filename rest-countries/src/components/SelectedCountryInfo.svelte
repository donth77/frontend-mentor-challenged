<script lang="ts">
  import { getContext } from "svelte";
  import alpha3ToName from "../alpha3ToName.json";
  import type { Country } from "../types";
  import { fillFlags } from "../flagUtils";
  import LeftArrow from "../assets/LeftArrow.svelte";

  export let countryData: Country;

  const {
    setSelectedCountry,
    setSelectedCountryWithCode,
  }: {
    setSelectedCountry: (country: Country | null) => void;
    setSelectedCountryWithCode: (alpha3Code: string) => void;
  } = getContext("selectedCountry");

  const currenciesList = countryData.currencies
    ?.map((currency) => currency.name)
    .join(", ");

  const languagesList = countryData.languages
    ?.map((language) => language.name)
    .join(", ");

  let borderCountryNames: string[] = [];
  $: borderCountryNames = countryData.borders?.map(
    (borderAlpha3) => (alpha3ToName as Record<string, string>)[borderAlpha3],
  );

  $: {
    console.log(countryData);
  }

  const isFlagNonRectangular =
    countryData.alpha3Code === "NPL" || countryData.alpha3Code === "CHE"; // Nepal or Switzerland
  const isFillFlag = fillFlags.has(countryData.alpha3Code);

  const flagAlign = isFlagNonRectangular
    ? "object-contain"
    : isFillFlag
      ? "object-fill"
      : "object-cover object-left";
</script>

<button
  class="mb-16 flex h-[32px] w-[104px] items-center justify-center gap-2 bg-white text-sm font-light text-cinder shadow-[0_0_7px_0_rgba(0,0,0,0.29)] hover:bg-gray-50 dark:bg-darkSlateGrey dark:text-white dark:hover:bg-gray-700"
  on:click={() => setSelectedCountry(null)}
>
  <LeftArrow />
  Back
</button>
<div class="flex h-full w-full md:items-center md:justify-center">
  <div class="flex flex-col md:w-11/12 md:flex-row md:gap-[120px]">
    <img
      class="max-h-[300px] w-full max-w-[500px] self-center rounded-md md:self-auto {flagAlign}"
      src={countryData.flag}
      alt="Flag of {countryData.name}"
    />
    <div class="mt-8 flex flex-col">
      <div class="flex flex-col">
        <h1 class="mb-4 text-[22px] font-extrabold text-cinder dark:text-white">
          {countryData.name}
        </h1>
        <div class="flex flex-col md:flex-row md:gap-4 lg:gap-20">
          <div class="flex flex-col gap-3">
            <span class="text-sm text-cinder dark:text-white"
              ><b>Native Name:&nbsp;</b>{countryData.nativeName}</span
            >
            <span class="text-sm text-cinder dark:text-white"
              ><b>Population:&nbsp;</b>{Number(
                countryData.population,
              ).toLocaleString()}</span
            >
            <span class="text-sm text-cinder dark:text-white"
              ><b>Region:&nbsp;</b>{countryData.region}</span
            >

            <span class="text-sm text-cinder dark:text-white"
              ><b>Sub Region:&nbsp;</b>{countryData.subregion}</span
            >

            {#if countryData.capital}
              <span class="text-sm text-cinder dark:text-white"
                ><b>Capital:&nbsp;</b>{countryData.capital}</span
              >
            {/if}
          </div>

          <div class="mt-8 flex flex-col gap-3">
            <span class="text-sm text-cinder dark:text-white"
              ><b>Top Level Domain:&nbsp;</b>{countryData.topLevelDomain}</span
            >
            <span class="text-sm text-cinder dark:text-white"
              ><b>Currencies:&nbsp;</b>{currenciesList}</span
            >
            <span class="text-sm text-cinder dark:text-white"
              ><b>Languages:&nbsp;</b>{languagesList}</span
            >
          </div>
        </div>

        <div class="mt-8 flex flex-col md:mt-16 lg:flex-row lg:gap-3">
          {#if borderCountryNames}
            <h2
              class="mb-4 text-base font-semibold text-cinder dark:text-white lg:min-w-[130px]"
            >
              Border Countries:
            </h2>
            <div class="flex flex-wrap gap-2 lg:max-w-[600px]">
              {#each borderCountryNames as borderCountryName, index}
                <button
                  class="flex h-[28px] w-[96px] items-center justify-center bg-white text-center text-xs font-light text-cinder shadow-[0_0_4px_1px_rgba(0,0,0,0.10)] hover:bg-gray-50 dark:bg-darkSlateGrey dark:text-white dark:hover:bg-gray-700"
                  on:click={() =>
                    setSelectedCountryWithCode(countryData.borders[index])}
                >
                  {borderCountryName}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
