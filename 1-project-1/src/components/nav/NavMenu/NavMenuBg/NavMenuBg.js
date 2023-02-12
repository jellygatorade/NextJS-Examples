import NavMenuBgThin from "./NavMenuBgThin";
import NavMenuBgFull from "./NavMenuBgFull";

function NavMenuBg() {
  return (
    <div className="fixed z-[50] w-full top-0 left-0">
      <NavMenuBgThin />
      <NavMenuBgFull />
    </div>
  );
}

export default NavMenuBg;
