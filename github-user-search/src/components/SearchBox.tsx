import { createSignal, Accessor, onMount, onCleanup, Setter } from "solid-js";
import classNames from "classnames";
import SearchIcon from "../assets/icon-search.svg";
import SearchDropdown from "./SearchDropdown";

function SearchBox({
  setUserId,
  notFound,
}: {
  setUserId: Setter<string>;
  notFound: Accessor<boolean>;
}) {
  const [inputText, setInputText] = createSignal<string>("");
  const [dropdownActive, setDropdownActive] = createSignal<boolean>(false);

  const [inputWidth, setInputWidth] = createSignal<number>(0);
  const [margin, setMargin] = createSignal<number>(0);
  let ref: HTMLInputElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  const handleWindowResize = () => {
    const inputWidth = inputRef?.offsetWidth || 0;
    const boxWidth = ref?.offsetWidth || 0;
    setInputWidth(inputWidth);
    setMargin(boxWidth - inputWidth);
  };

  const setUserIdForInput = () => {
    if (inputText()) {
      setUserId(inputText());
    }
  };

  onMount(() => {
    ref?.focus();
    inputRef?.focus();
    const inputWidth = inputRef?.offsetWidth || 0;
    const boxWidth = ref?.offsetWidth || 0;
    setInputWidth(inputWidth);
    setMargin(boxWidth - inputWidth);
    window.addEventListener("resize", handleWindowResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handleWindowResize);
  });

  return (
    <div>
      <div
        class={classNames(
          "h-[4.3125rem] w-full bg-snowWhite dark:bg-yankeesBlue rounded-t-2xl mt-6 shadow-lg flex items-center px-2.5",
          // {
          //   "rounded-b-2xl": !dropdownActive(),
          // },
          {
            "rounded-b-2xl": true,
          }
        )}
      >
        <div class="flex w-full" ref={ref}>
          <span class="sm:ml-[1.375rem] fill-azure">
            <SearchIcon />
          </span>
          <div class="flex w-full" ref={inputRef}>
            <input
              class="bg-transparent w-full text-[0.813rem] sm:text-[1.125rem] ml-[0.5rem] sm:ml-[1.5rem] outline-none dark:text-white dark:placeholder-white text-charleston caret-azure"
              placeholder="Search GitHub username…"
              value={inputText()}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setUserIdForInput();
                  setDropdownActive(false);
                }
              }}
              onInput={(e) => {
                setInputText(e.target.value);
                setDropdownActive(true);
              }}
              onFocus={() => setDropdownActive(true)}
              onBlur={() => setDropdownActive(false)}
            />

            <span class="text-[0.9375rem] text-tart whitespace-nowrap mx-6">
              {notFound() ? "No results" : ""}
            </span>
          </div>
        </div>
        <button
          class="flex justify-center items-center min-w-[5.25rem] sm:min-w-[6.625rem] h-[3.125rem] bg-azure rounded-xl hover:bg-blueJeans"
          onClick={() => {
            setUserIdForInput();
            setDropdownActive(false);
          }}
        >
          <span class="text-white">Search</span>
        </button>
      </div>
      <SearchDropdown
        searchText={inputText}
        active={dropdownActive}
        width={inputWidth}
        margin={margin}
        setInputText={setInputText}
        setUserId={setUserId}
      />
    </div>
  );
}

export default SearchBox;
