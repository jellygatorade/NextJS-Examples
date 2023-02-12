import { forwardRef } from "react";

const NavItemButton = forwardRef((props, ref) => {
  return (
    //px-[0.5em] py-[3px] text-black-off - classes moved to <Link> and <a> within Nav.js
    <li
      className="list-none py-[3px] opacity-1 scale-100 bg-white-off whitespace-nowrap rounded bg-opacity-65 shadow-light-grey-3px hover:scale-90 hover:bg-opacity-80 transition-all duration-300"
      ref={ref}
    >
      {props.children}
    </li>
  );
});

export default NavItemButton;
