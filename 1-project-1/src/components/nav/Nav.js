import { useRef, useCallback, useEffect, useState } from "react";

import NavMenu from "./NavMenu/NavMenu";
import NavMenuBg from "./NavMenu/NavMenuBg/NavMenuBg";
import TopMargin from "./TopMargin";

/*****************************************
 * Define the menu items
 *****************************************/
const navItems = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" },
  { href: "https://www.google.com", text: "Google" },
];

/*****************************************
 * React component
 *****************************************/
function Nav() {
  const navMenuRef = useRef(null);
  const [scrollAtTop, setScrollAtTop] = useState(true);
  const [navMenuHeight, setNavMenuHeight] = useState(0);
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);

  const scrollHandler = useCallback(() => {
    if (document.documentElement.scrollTop === 0) {
      setScrollAtTop(true);
    } else if (document.documentElement.scrollTop > 0) {
      if (scrollAtTop) {
        setScrollAtTop(false);
      }
    }
  }, []);

  // "init" operations run as a React side effect with no dependencies
  // Set initial height and window listeners
  useEffect(() => {
    setNavMenuHeight(navMenuRef.current.offsetHeight);

    function handleResize() {
      setNavMenuHeight(navMenuRef.current.offsetHeight);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <>
      <NavMenu
        ref={navMenuRef}
        onOpen={() => setNavMenuIsOpen(true)}
        onClose={() => setNavMenuIsOpen(false)}
        menuItems={navItems}
      />
      <NavMenuBg
        height={scrollAtTop ? 0 : navMenuHeight}
        navMenuIsOpen={navMenuIsOpen}
      />
      <TopMargin height={navMenuHeight} />
    </>
  );
}

export default Nav;
