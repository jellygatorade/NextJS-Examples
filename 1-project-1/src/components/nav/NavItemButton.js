import { forwardRef } from "react";

const NavItemButton = forwardRef((props, ref) => {
  return (
    <button
      className="px-[0.5em] opacity-1 scale-100 py-[3px] bg-white-off text-black-off whitespace-nowrap rounded bg-opacity-65 shadow-light-grey-3px hover:scale-90 hover:bg-opacity-80 transition-all duration-300"
      ref={ref}
    >
      {props.children}
    </button>
  );
});

export default NavItemButton;
