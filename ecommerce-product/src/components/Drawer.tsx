import { useState, useEffect } from "react";
import { SM_BREAKPOINT } from "../constants";
import { NAV_ITEMS } from "../constants";
import { ReactComponent as HamburgerMenu } from "../assets/icon-menu.svg";
import { ReactComponent as CloseIcon } from "../assets/icon-close.svg";

function Drawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const closeDrawer = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > SM_BREAKPOINT) {
        closeDrawer();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <label
        htmlFor="open-menu"
        aria-haspopup="true"
        aria-controls="menu"
        className="ml-6 mr-4 cursor-pointer sm:hidden"
        id="openmenu"
      >
        <HamburgerMenu />
      </label>
      <input
        type="checkbox"
        data-menu
        id="open-menu"
        className="peer hidden"
        checked={open}
        onChange={toggleDrawer}
      />
      <div
        className="fixed inset-y-0 z-10 flex h-screen w-full -translate-x-full transition-transform duration-500 peer-checked:transform-none peer-checked:opacity-100 sm:hidden"
        role="menu"
        id="menu"
        aria-labelledby="openmenu"
      >
        <nav className="box-border block flex w-[310px] translate-x-[0%] flex-col overflow-auto bg-white p-6 text-white transition-all transition-transform duration-500 peer-checked:transform-none peer-checked:opacity-100">
          <CloseIcon
            className="mb-[50px] cursor-pointer fill-darkGrayishBlue"
            onClick={closeDrawer}
          />
          {NAV_ITEMS.map((title, i) => (
            <span
              key={`drawerNav-${i}`}
              className="mb-5 cursor-pointer font-kumbhSans text-lg font-bold text-veryDarkBlue"
              onClick={closeDrawer}
            >
              {title}
            </span>
          ))}
        </nav>
        <label htmlFor="open-menu" className="flex w-full"></label>
      </div>
      <div className="pointer-events-none fixed top-0 z-[2] hidden h-full w-full animate-fadeIn bg-overlayBg peer-checked:block"></div>
    </>
  );
}

export default Drawer;
