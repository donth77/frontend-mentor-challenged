import { Accessor, Resource } from "solid-js";
import classNames from "classnames";
import LocIcon from "../assets/icon-location.svg";
import TwitIcon from "../assets/icon-twitter.svg";
import SiteIcon from "../assets/icon-website.svg";
import CompIcon from "../assets/icon-company.svg";
import { User } from "../types";

function UserInfo({
  isLoading,
  user,
}: {
  isLoading: Accessor<boolean>;
  user: Resource<User | null>;
}) {
  return (
    <div class="w-full bg-snowWhite dark:bg-yankeesBlue rounded-2xl mt-6 shadow-xl p-6 pt-8 sm:p-10 lg:p-12 lg:pt-11 flex min-h-[32.3125rem] sm:min-h-[30.0625rem] lg:min-h-[27.75rem]">
      {isLoading() && (
        <div class="w-full flex justify-center items-center">
          <svg
            aria-hidden="true"
            class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-azure"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading…</span>
        </div>
      )}
      {!isLoading() && user()?.id && (
        <div class="flex w-full flex-col">
          <div class="flex w-full lg:h-[4.6875rem]">
            <img
              class="w-[4.375rem] h-[4.375rem] sm:w-[7.3125rem] sm:h-[7.3125rem] rounded-full mr-[1.21875rem] sm:mr-[2.5625rem] lg:mr-[2.3125rem]"
              src={user()?.avatar_url}
              alt="GitHub avatar"
            ></img>
            <div class="flex w-full justify-normal flex-col lg:flex-row lg:justify-between">
              <div class="flex flex-col">
                <h2 class="font-bold text-base sm:text-[1.625rem] text-gunmetal dark:text-white">
                  {user()?.name}
                </h2>
                <a
                  class="text-[0.8125rem] sm:text-base text-azure hover:underline mt-[0.5rem]"
                  href={user()?.html_url}
                  target="_blank"
                >
                  @{user()?.login}
                </a>
              </div>
              <span class="text-[0.8125rem] sm:text-[0.9375rem] dark:text-white text-slateGrey pt-[0.25rem] lg:pt-[0.6rem]">
                {`Joined ${new Date(
                  user()?.created_at || ""
                ).toLocaleDateString(
                  navigator.language.startsWith("en")
                    ? navigator.language
                    : "en",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}`}
              </span>
            </div>
          </div>
          <div class="flex flex-col mt-5 lg:mt-0 lg:ml-[9.625rem]">
            <p class="text-[0.8125rem] leading-[1.5625rem] sm:text-[0.9375rem] dark:text-white text-queenBlue overflow-hidden text-ellipsis max-h-[12.5rem]">
              {user()?.bio || "This profile has no bio"}
            </p>
            <div class="bg-ghostWhite dark:bg-darkGunmetal w-full rounded-xl h-[5.3125rem] mt-8 flex px-8 items-center">
              <div class="flex flex-col items-center sm:items-start mr-7 sm:mr-0 ml-2 sm:ml-0">
                <h3 class="text-[0.6875rem] sm:text-[0.8125rem] dark:text-white text-queenBlue">
                  Repos
                </h3>
                <span class="font-bold text-base sm:text-[1.375rem] dark:text-white text-gunmetal mt-1">
                  {user()?.public_repos}
                </span>
              </div>
              <div class="flex w-full sm:justify-evenly">
                <div class="flex flex-col items-center sm:items-start mr-7 sm:mr-0">
                  <h3 class="text-[0.6875rem] sm:text-[0.8125rem] dark:text-white text-queenBlue">
                    Followers
                  </h3>
                  <span class="font-bold text-base sm:text-[1.375rem] dark:text-white text-gunmetal mt-1">
                    {user()?.followers}
                  </span>
                </div>
                <div class="flex flex-col items-center sm:items-start">
                  <h3 class="text-[0.6875rem] sm:text-[0.8125rem] dark:text-white text-queenBlue">
                    Following
                  </h3>
                  <span class="font-bold text-base sm:text-[1.375rem] dark:text-white text-gunmetal mt-1">
                    {user()?.following}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:mt-[1.875rem] lg:mt-[2.3125rem] sm:w-[90%] sm:justify-between mt-6">
              <div class="flex flex-col sm:w-[55%]">
                <span
                  title={user()?.location}
                  class={classNames(
                    "flex text-[0.8125rem] sm:text-[0.9375rem] items-center",
                    {
                      "dark:text-white dark:fill-white text-queenBlue fill-queenBlue":
                        Boolean(user()?.location),
                    },
                    {
                      "dark:text-coolGrey dark:fill-coolGrey text-wildBlueYonder fill-wildBlueYonder":
                        !user()?.location,
                    }
                  )}
                >
                  <span>
                    <LocIcon />
                  </span>
                  <span class="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user()?.location || "Not Available"}
                  </span>
                </span>
                <span
                  title={user()?.blog}
                  class={classNames(
                    "flex text-[0.8125rem] sm:text-[0.9375rem] mt-3 sm:mt-4 items-center",
                    {
                      "dark:text-white dark:fill-white text-queenBlue fill-queenBlue":
                        Boolean(user()?.blog),
                    },
                    {
                      "dark:text-coolGrey dark:fill-coolGrey text-wildBlueYonder fill-wildBlueYonder":
                        !user()?.blog,
                    }
                  )}
                >
                  <span>
                    <SiteIcon />
                  </span>
                  <a
                    class="ml-4 hover:underline overflow-hidden text-ellipsis whitespace-nowrap"
                    href={user()?.blog}
                    target="_blank"
                  >
                    {user()?.blog || "Not Available"}
                  </a>
                </span>
              </div>
              <div class="flex flex-col sm:w-[40%]">
                <span
                  title={user()?.twitter_username}
                  class={classNames(
                    "flex text-[0.8125rem] sm:text-[0.9375rem] mt-3 sm:mt-0 items-center",
                    {
                      "dark:text-white dark:fill-white text-queenBlue fill-queenBlue":
                        Boolean(user()?.twitter_username),
                    },
                    {
                      "dark:text-coolGrey dark:fill-coolGrey text-wildBlueYonder fill-wildBlueYonder":
                        !user()?.twitter_username,
                    }
                  )}
                >
                  <span>
                    <TwitIcon />
                  </span>

                  <span class="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user()?.twitter_username || "Not Available"}
                  </span>
                </span>
                <span
                  title={user()?.company}
                  class={classNames(
                    "flex text-[0.8125rem] sm:text-[0.9375rem] mt-3 sm:mt-4 items-center",
                    {
                      "dark:text-white dark:fill-white text-queenBlue fill-queenBlue":
                        Boolean(user()?.company),
                    },
                    {
                      "dark:text-coolGrey dark:fill-coolGrey text-wildBlueYonder fill-wildBlueYonder":
                        !user()?.company,
                    }
                  )}
                >
                  <span>
                    <CompIcon />
                  </span>

                  <span class="ml-4 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user()?.company || "Not Available"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
