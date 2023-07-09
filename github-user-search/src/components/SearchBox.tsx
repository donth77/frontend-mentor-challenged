import { createSignal, Accessor } from "solid-js";
import SearchIcon from "../assets/icon-search.svg";

function SearchBox({
  setUserId,
  notFound,
}: {
  setUserId: (id: string) => void;
  notFound: Accessor<boolean>;
}) {
  const [inputText, setInputText] = createSignal<string>("");
  return (
    <div class="h-[4.3125rem] w-full bg-snowWhite dark:bg-yankeesBlue rounded-2xl mt-6 shadow-lg flex items-center px-2.5">
      <span class="sm:ml-[1.375rem]">
        <SearchIcon />
      </span>
      <input
        class="bg-transparent w-full text-[0.813rem] sm:text-[1.125rem] ml-[0.5rem] sm:ml-[1.5rem] outline-none dark:text-white dark:placeholder-white text-charleston caret-azure"
        placeholder="Search GitHub username…"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setUserId((e.target as HTMLInputElement).value);
          }
        }}
      />
      <span class="text-[0.9375rem] text-tart whitespace-nowrap mx-6">
        {notFound() ? "No results" : ""}
      </span>
      <button
        class="flex justify-center items-center min-w-[5.25rem] sm:min-w-[6.625rem] h-[3.125rem] bg-azure rounded-xl hover:bg-blueJeans"
        onClick={() => {
          setUserId(inputText());
        }}
      >
        <span class="text-white">Search</span>
      </button>
    </div>
  );
}

export default SearchBox;
