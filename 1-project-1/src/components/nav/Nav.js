import { useRef, useEffect, useState } from "react";

import NavMenu from "./NavMenu";
import TopMargin from "./TopMargin";

function Nav() {
  const navMenuRef = useRef(null);
  const [navMenuHeight, setNavMenuHeight] = useState(0);

  useEffect(() => {
    setNavMenuHeight(navMenuRef.current.offsetHeight);
  }, []);

  return (
    <>
      <NavMenu ref={navMenuRef} />
      <TopMargin height={navMenuHeight} />
    </>
  );
}

export default Nav;
