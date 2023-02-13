import { forwardRef, useRef, useEffect, useCallback } from "react";

import Link from "next/link";

import OpenCloseNavButton from "./OpenCloseNavButton";
import NavShaderButton from "./NavShaderButton";
import NavItemButton from "./NavItemButton";

import { fadeIn } from "../fade-in-out-elements";

// To do?
// Thoroughly test with mobile
//

/*****************************************
 * Define the menu items
 *****************************************/
const navItems = [
  { type: "Link", href: "/", text: "Home" },
  { type: "Link", href: "/about", text: "About" },
  { type: "Link", href: "/contact", text: "Contact" },
  { type: "a", href: "https://www.google.com", text: "Google" },
];

/*****************************************
 * Config for menu anim
 *****************************************/
const randomizeOrder = true; // Choose if order of appearance and disappearance of menu items is randomized
const timeBetween = 30; // Delay betweens items in menu animation

/*****************************************
 * Vars for menu scripts
 *****************************************/
let menuState; // This is not React state. The menu being "open" or "closed" is all handled through css classes and does not require any React component re-rendering
let closeMenuRequest = false;
let menuItemsIndices, shuffled;

/*****************************************
 * Fns for controlling the menu
 *****************************************/
// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

function hideMenuItem(element) {
  element.classList.remove("opacity-1", "scale-100");
  element.classList.add("opacity-0", "scale-0");
}

function showMenuItem(element) {
  element.classList.remove("opacity-0", "scale-0");
  element.classList.add("opacity-1", "scale-100");
}

async function showAllMenuItems(array) {
  closeMenuRequest = false;

  if (randomizeOrder) {
    shuffled = shuffle(menuItemsIndices);
  }

  for (let i = 0; i < array.length; i++) {
    if (closeMenuRequest) {
      break;
    }

    if (randomizeOrder) {
      showMenuItem(array[shuffled[i]]);
    } else {
      showMenuItem(array[i]);
    }

    await timer(timeBetween);
  }
}

async function hideAllMenuItems(array) {
  closeMenuRequest = true;

  if (randomizeOrder) {
    shuffled = shuffle(menuItemsIndices);
  }

  for (let i = 0; i < array.length; i++) {
    if (randomizeOrder) {
      hideMenuItem(array[shuffled[i]]);
    } else {
      hideMenuItem(array[i]);
    }

    await timer(timeBetween);
  }
}

/*****************************************
 * Fns for randomizing the menu animation
 *****************************************/
function integersAndZeroThrough(length) {
  let newArr = [];
  for (let i = 0; i < length; i++) {
    newArr.push(i);
  }
  return newArr;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/*****************************************
 * React component
 *****************************************/
const NavMenu = forwardRef((props, ref) => {
  const navRef = useRef(null);
  const openCloseButtonRef = useRef(null);
  const navItemsRef = useRef([]);

  //console.log(ref.current);

  // "init" operations run as a React side effect with no dependencies
  useEffect(() => {
    navItemsRef.current[0].style.width =
      navItemsRef.current[0].offsetHeight + "px"; // shader button ensure 1:1 aspect ratio
    fadeIn(navRef.current); // initial fade in
    setTimeout(closeMenu, 1000); // initial menu close
    menuItemsIndices = integersAndZeroThrough(navItemsRef.current.length); // an array of values representing the indicies of navItemsRef.current is used for randomizing the order of css animations
  }, []);

  const openMenu = useCallback(() => {
    openCloseButtonRef.current.rotate360(); // method from useImperativeHandle in the ref
    openCloseButtonRef.current.shortenBottomBar(); // method from useImperativeHandle in the ref
    showAllMenuItems(navItemsRef.current);
    menuState = "open";
    props.onOpen(); // pass to React parent via props
  }, []);

  const closeMenu = useCallback(() => {
    openCloseButtonRef.current.unrotate360(); // method from useImperativeHandle in the ref
    openCloseButtonRef.current.widenBottomBar(); // method from useImperativeHandle in the ref
    hideAllMenuItems(navItemsRef.current);
    menuState = "closed";
    props.onClose(); // pass to React parent via props
  }, []);

  const touchControlMenu = useCallback((event) => {
    event.stopPropagation();

    if (menuState === "closed") {
      openMenu();
    } else if (menuState === "open") {
      closeMenu();
    }
  }, []);

  return (
    <div
      className="fixed z-[10000] w-full top-0 left-0 p-[1rem] text-xl"
      ref={ref}
    >
      <nav
        className="relative z-[100] flex flex-wrap gap-[0.5em] m-0 p-0 invisible opacity-0 transition-all duration-500"
        ref={navRef}
        onMouseLeave={closeMenu}
        onTouchEnd={touchControlMenu}
      >
        <OpenCloseNavButton
          openMenu={openMenu}
          touchControlMenu={touchControlMenu}
          ref={openCloseButtonRef}
        />
        {/* Store array of elements in navItemsRef.current for applying the CSS animations to open  and close menu */}
        {/* Instead of specifying [0] and [index + 1] I could probably include a type: "ShaderBtn" in navItems array, but this works fine */}
        <NavShaderButton ref={(el) => (navItemsRef.current[0] = el)} />
        {navItems.map((item, index) => (
          <NavItemButton
            key={index}
            ref={(el) => (navItemsRef.current[index + 1] = el)} // index + 1 because NavShaderButton is first
          >
            {item.type === "Link" && (
              <Link
                className="px-[0.5em] py-[6px] text-black-off"
                href={item.href}
              >
                {item.text}
              </Link>
            )}
            {item.type === "a" && (
              <a
                className="px-[0.5em] py-[6px] text-black-off"
                href={item.href}
              >
                {item.text}
              </a>
            )}
          </NavItemButton>
        ))}
      </nav>
    </div>
  );
});

export default NavMenu;
