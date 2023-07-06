import Drawer from "./Drawer";
import { NAV_ITEMS } from "../constants";
import Cart from "./Cart";
import { ReactComponent as Logo } from "../assets/logo.svg";
import avatarImg from "../assets/image-avatar.png";

function Header() {
  return (
    <>
      <div className="h-17 flex w-full items-center justify-between  pb-[25px] pt-[19px] sm:h-28 sm:px-0 sm:pb-[0px] sm:pt-[0px]">
        <div className="flex h-full w-[591px] items-center sm:justify-between">
          <Drawer />
          <Logo />
          <div className="w-[56.5px]"></div>
          {NAV_ITEMS.map((title, i) => (
            <span
              key={`nav-${i}`}
              className="hidden h-full cursor-pointer items-center border-b-4 border-transparent px-1 font-kumbhSans text-[15px] leading-[26px] text-darkGrayishBlue hover:border-orange hover:text-black sm:flex"
            >
              {title}
            </span>
          ))}
        </div>

        <div className="mr-6 flex items-center sm:mr-0">
          <Cart />
          <div className="w-[22px] sm:w-[46px]"></div>
          <img
            src={avatarImg}
            className="h-[28px] min-w-[28px] cursor-pointer rounded-full border-2 hover:border-orange sm:h-[50px] sm:min-w-[50px] "
          />
        </div>
      </div>
      <div className="hidden h-[1px] bg-dividerColor sm:block"></div>
    </>
  );
}

export default Header;
