import {
  Accessor,
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import classNames from "classnames";
import { debounce } from "lodash";
import { API_TOKEN } from "../../config";
import { User } from "../types";
import SearchIcon from "../assets/icon-search.svg";

const LIMIT = 10;

function getHighlightedText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part) =>
        part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
      )}
    </span>
  );
}

export function SearchDropdown({
  searchText,
  active,
  width,
  margin,
  setInputText,
  setUserId,
}: {
  searchText: Accessor<string>;
  active: Accessor<boolean>;
  width: Accessor<number>;
  margin: Accessor<number>;
  setInputText: Setter<string>;
  setUserId: Setter<string>;
}) {
  const cache = new Map();
  const [users, setUsers] = createSignal<User[]>([]);
  const [activeIndex, setActiveIndex] = createSignal<number>(-1);

  const searchUsers = async (query: string) => {
    if (query.length > 2) {
      try {
        const url = `https://api.github.com/search/users?q=${query}&per_page=${LIMIT}`;
        if (cache.has(url)) {
          setUsers(cache.get(url));
        } else {
          const res = await fetch(url, {
            headers: { Authorization: `token ${API_TOKEN}` },
          });
          const json: {
            items: User[];
          } = await res.json();
          const filtered = json.items.filter(
            (u) => u.login.toLowerCase() != query.toLowerCase().trim()
          );
          setUsers(filtered);
          cache.set(url, filtered);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setUsers([]);
    }
  };

  const incrementActiveIndex = () => {
    if (activeIndex() == -1) {
      setActiveIndex(0);
    } else if (activeIndex() < LIMIT - 1) {
      setActiveIndex(activeIndex() + 1);
    } else {
      setActiveIndex(-1);
    }
  };
  const decrementActiveIndex = () => {
    if (activeIndex() == -1) {
      setActiveIndex(LIMIT - 1);
    } else if (activeIndex() > 0) {
      setActiveIndex(activeIndex() - 1);
    } else {
      setActiveIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        setInputText(users()[activeIndex()].login);
        break;
      case "ArrowDown":
        incrementActiveIndex();
        break;
      case "ArrowUp":
        decrementActiveIndex();
        break;
    }
  };

  const debouncedSearch = debounce(searchUsers, 100);

  createEffect(() => {
    debouncedSearch(searchText());
    setActiveIndex(-1);
  });

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    debouncedSearch.cancel();
    window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <menu
      style={{
        width: `${width()}px`,
        "margin-left": `${margin()}px`,
      }}
      class={classNames(
        "bg-snowWhite dark:bg-yankeesBlue shadow-lg absolute z-10 rounded-b-2xl",
        {
          hidden: !active(),
        }
      )}
    >
      {users() && (
        <For each={users()}>
          {(user, i) => (
            <li
              class={classNames(
                "text-black dark:text-white flex items-center cursor-pointer",
                { "rounded-b-2xl": i() === LIMIT - 1 },
                { "bg-gray-200 dark:bg-darkGunmetal": i() === activeIndex() },
                {
                  "bg-snowWhite dark:bg-yankeesBlue": i() !== activeIndex(),
                }
              )}
              onMouseEnter={() => setActiveIndex(i())}
              onMouseLeave={() => setActiveIndex(-1)}
              onMouseDown={() => {
                setInputText(user.login);
                setUserId(user.login);
              }}
            >
              <span class="fill-black dark:fill-white scale-[0.6] px-1">
                <SearchIcon />
              </span>
              <span class="overflow-hidden text-ellipsis whitespace-nowrap">
                {getHighlightedText(user.login, searchText())}
              </span>
            </li>
          )}
        </For>
      )}
    </menu>
  );
}

export default SearchDropdown;
