import classes from "./NavMenuBg.module.css";

const allClasses = `absolute z-[51] top-0 left-0 w-full transition-all duration-500 opacity-100 visible ${
  classes[`nav-bg-thin`]
}`;

function NavMenuBgThin(props) {
  return <div className={allClasses} style={{ height: props.height }}></div>;
}

export default NavMenuBgThin;
