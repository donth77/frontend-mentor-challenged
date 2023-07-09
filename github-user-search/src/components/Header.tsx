import ThemeToggle from "./ThemeToggle";

function App() {
  return (
    <header class="flex justify-between ">
      <h1 class="font-bold text-[1.625rem] dark:text-white text-charleston">
        devfinder
      </h1>
      <ThemeToggle />
    </header>
  );
}

export default App;
