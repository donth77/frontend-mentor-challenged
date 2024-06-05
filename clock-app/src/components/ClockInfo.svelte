<script lang="ts">
  import MoreButton from "./MoreButton.svelte";
  import SunIcon from "../assets/sun.svelte";
  import MoonIcon from "../assets/moon.svelte";
  import classNames from "classnames";
  import { onDestroy, onMount } from "svelte";

  export let drawerActive = false;
  export let toggleDrawer = () => {};

  let ip = "";
  let timezoneAbbrev = "";
  let city = "";
  let country = "";
  let timeStr = "";
  let timezone = "";
  let dayOfWeek = "";
  let dayOfYear = "";
  let weekNum = "";
  let isMorning = false;
  let isAfternoon = false;
  let isEvening = false;
  let isSun = false;
  let greeting = "";
  let isLoading = true;
  let isMobile = window.innerWidth <= 640;

  async function getTimeInfo() {
    try {
      const resp = await fetch("https://worldtimeapi.org/api/ip").then((r) =>
        r.json(),
      );
      ip = resp.client_ip;
      timezoneAbbrev = resp.abbreviation;
      const date = new Date(resp.datetime);
      timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const hours = date.getHours();
      isMorning = hours >= 5 && hours < 12;
      isAfternoon = hours >= 12 && hours < 18;
      isEvening = hours >= 18 || hours < 5;
      isSun = isMorning || isAfternoon;

      setGreeting();

      timezone = resp.timezone;
      dayOfWeek = resp.day_of_week;
      dayOfYear = resp.day_of_year;
      weekNum = resp.week_number;
    } catch (e) {
      console.error(e);
    }

    if (ip) {
      try {
        const resp = await fetch(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${
            import.meta.env.VITE_GEO_API_KEY
          }`,
        );
        const json = await resp.json();
        if (resp.status === 200) {
          city = json.city;
          country = json.country;
        }
      } catch (e) {
        console.error(e);
      }
    }

    isLoading = false;
  }

  function setGreeting() {
    if (isMorning) {
      greeting = "Good morning";
    } else if (isAfternoon) {
      greeting = "Good afternoon";
    } else if (isEvening) {
      greeting = "Good evening";
    }

    if (window.innerWidth > 640) {
      greeting = `${greeting}, It's currently`;
    }
  }

  function msToNextMin(): number {
    const now = new Date();
    const then = new Date(now);
    if (now.getMinutes() < 59) {
      then.setMinutes(now.getMinutes() + 1, 0, 0);
    } else {
      then.setHours(1, 0, 0, 0);
    }
    return then.getTime() - now.getTime() + 1000;
  }

  onMount(getTimeInfo);

  let timer: NodeJS.Timeout | null = null;
  setTimeout(() => {
    getTimeInfo();
    timer = setInterval(() => {
      getTimeInfo();
    }, 60 * 1000);
  }, msToNextMin());

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  window.addEventListener("resize", () => {
    setGreeting();
    isMobile = window.innerWidth <= 640;
  });
</script>

<div>
  <div
    class={classNames(
      `flex flex-col transition-transform duration-500 sm:-mt-20 xl:flex-row xl:items-center xl:justify-between`,
      {
        "translate-y-[216px]": isMobile,
        "translate-y-[400px]": !isMobile,
        "transform-none": drawerActive,
      },
    )}
  >
    <div>
      <div class="flex">
        {#if !isLoading}
          {#if isSun}
            <SunIcon />
          {:else}
            <MoonIcon />
          {/if}
        {/if}

        <h2
          class="ml-4 text-[0.938rem] uppercase tracking-[0.188rem] text-white sm:text-lg xl:text-xl"
        >
          {@html greeting}
        </h2>
      </div>
      <span
        class="text-[6.25rem] font-bold text-white sm:text-[7rem] sm:leading-[7rem] xl:text-[9rem] xl:leading-[9rem]"
        >{@html timeStr}</span
      ><span
        class="ml-1 text-[0.938rem] font-light text-white sm:text-[2rem] xl:text-[2.5rem]"
        >{@html timezoneAbbrev}</span
      >
      {#if !isLoading && city && country}
        <h2
          class="mb-12 text-[0.938rem] font-bold uppercase tracking-[0.188rem] text-white sm:text-[1.125rem] xl:text-2xl"
        >
          In {@html city}, {@html country}
        </h2>
      {/if}
    </div>
    <MoreButton active={drawerActive} onClick={toggleDrawer} />
  </div>
  <div
    class={classNames(
      "mb-[-40px] ml-[-1.625rem] mt-10 flex h-[256px] w-screen translate-y-full flex-col px-[1.625rem] py-9 backdrop-blur-md transition-transform duration-500 sm:-ml-16 sm:h-[440px] sm:flex-row sm:items-center sm:justify-evenly lg:h-[400px]",
      {
        "bg-whiteBackdrop": isSun,
        "bg-blackBackdrop": !isSun,
        "transform-none": drawerActive,
      },
    )}
  >
    <div class="flex flex-col">
      <div
        class="flex items-center justify-between sm:flex-col sm:items-start
    "
      >
        <span
          class={classNames(
            "text-[0.625rem] uppercase tracking-[0.125rem] sm:mb-3 sm:text-[0.75rem] sm:leading-[1.75rem] xl:mb-6 xl:text-[0.938rem] xl:tracking-[0.188rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>Current Timezone</span
        ><span
          class={classNames(
            "text-xl font-bold sm:text-[2.5rem] xl:text-[3.5rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>{@html timezone}</span
        >
      </div>
      <div
        class="mt-3 flex items-center justify-between sm:mt-12 sm:flex-col sm:items-start
  "
      >
        <span
          class={classNames(
            "text-[0.625rem] uppercase tracking-[0.125rem] sm:mb-3 sm:text-[0.75rem] sm:leading-[1.75rem] xl:mb-6 xl:text-[0.938rem] xl:tracking-[0.188rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>Day of the Year</span
        ><span
          class={classNames(
            "text-xl font-bold sm:text-[2.5rem] xl:text-[3.5rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>{@html dayOfYear}</span
        >
      </div>
    </div>

    <div class="flex flex-col">
      <div
        class="mt-3 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-start
"
      >
        <span
          class={classNames(
            "text-[0.625rem] uppercase tracking-[0.125rem] sm:mb-3 sm:text-[0.75rem] sm:leading-[1.75rem] xl:mb-6 xl:text-[0.938rem] xl:tracking-[0.188rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>Day of the Week</span
        ><span
          class={classNames(
            "text-xl font-bold sm:text-[2.5rem] xl:text-[3.5rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>{@html dayOfWeek}</span
        >
      </div>
      <div
        class="mt-3 flex items-center justify-between sm:mt-12 sm:flex-col sm:items-start
"
      >
        <span
          class={classNames(
            "text-[0.625rem] uppercase tracking-[0.125rem] sm:mb-3 sm:text-[0.75rem] sm:leading-[1.75rem] xl:mb-6 xl:text-[0.938rem] xl:tracking-[0.188rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>Week Number</span
        ><span
          class={classNames(
            "text-xl font-bold sm:text-[2.5rem] xl:text-[3.5rem]",
            {
              "text-darkCharcoal": isSun,
              "text-white": !isSun,
            },
          )}>{@html weekNum}</span
        >
      </div>
    </div>
  </div>
</div>
