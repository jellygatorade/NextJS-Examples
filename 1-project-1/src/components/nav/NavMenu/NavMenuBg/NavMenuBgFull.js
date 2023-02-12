import classes from "./NavMenuBg.module.css";

const allClasses = `absolute z-[50] top-0 left-0 w-full transition-all duration-500 opacity-100 visible ${
  classes[`nav-bg-full`]
}`;

function NavMenuBgFull() {
  return <div className={allClasses}></div>;
}

export default NavMenuBgFull;
