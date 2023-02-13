import NavMenuBgThin from "./NavMenuBgThin";
import NavMenuBgFull from "./NavMenuBgFull";

function NavMenuBg(props) {
  return (
    <div className="fixed z-[50] w-full top-0 left-0">
      <NavMenuBgThin height={props.height} />
      <NavMenuBgFull height={props.navMenuIsOpen ? props.height : 0} />
    </div>
  );
}

export default NavMenuBg;
