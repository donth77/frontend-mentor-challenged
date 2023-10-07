<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import ClockInfo from "./components/ClockInfo.svelte";
  import Quote from "./components/Quote.svelte";

  const apiUrlDay = "https://source.unsplash.com/random/?landscape,day";
  const apiUrlNight = "https://source.unsplash.com/random/?landscape,night";
  const DAY_KEY = "CLOCK_BG_DAY_IMAGE_URL";
  const NIGHT_KEY = "CLOCK_BG_NIGHT_IMAGE_URL";
  let imageUrl = "";
  let drawerActive = false;
  let isDay = true;

  function toggleDrawer() {
    drawerActive = !drawerActive;
  }

  function setLSWithExpiry(key: string, value: string, ttl: number) {
    const item = {
      value: value,
      expiry: new Date().getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getLSWithExpiry(key: string): string | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  function msToMidnight(): number {
    const now = new Date();
    const then = new Date(now);
    then.setHours(24, 0, 0, 0);
    return then.getTime() - now.getTime();
  }

  async function fetchImage() {
    const hours = new Date().getHours();
    isDay = hours >= 5 && hours < 18;
    const lsKey = isDay ? DAY_KEY : NIGHT_KEY;
    const apiUrl = isDay ? apiUrlDay : apiUrlNight;

    const stored = getLSWithExpiry(lsKey);
    if (stored) {
      imageUrl = stored;
    } else {
      try {
        const resp = await fetch(apiUrl);
        imageUrl = resp.url;
        setLSWithExpiry(lsKey, imageUrl, msToMidnight());
      } catch (e) {
        console.error(e);
      }
    }
  }

  onMount(fetchImage);

  const timer = setInterval(() => {
    fetchImage();
  }, 60 * 1000);

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<main class="h-screen w-screen">
  <div
    class="absolute z-20 flex h-full w-full flex-col justify-between overflow-hidden px-[1.625rem] pb-10 pt-8 sm:px-16"
  >
    <Quote {drawerActive} />
    <ClockInfo {drawerActive} {toggleDrawer} />
  </div>
  <div class="absolute top-0 z-10 h-full w-full bg-black bg-fixed opacity-40" />
  <div
    class="absolute top-0 h-full w-full bg-cover bg-center"
    style="background-image: url('{imageUrl}')"
  />
</main>
