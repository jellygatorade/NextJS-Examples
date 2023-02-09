import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";

// CSS classes animations
function rotate360(element) {
  element.classList.add("rotate-360");
}

function unrotate360(element) {
  element.classList.remove("rotate-360");
}

function shorten(element) {
  element.classList.remove("w-full");
  element.classList.add("w-2/3");
}

function widen(element) {
  element.classList.remove("w-2/3");
  element.classList.add("w-full");
}

// Component
const OpenCloseNavButton = forwardRef((props, ref) => {
  const buttonRef = useRef(null);
  const bottomBarRef = useRef(null);

  // ensure 1:1 aspect ratio
  useEffect(() => {
    buttonRef.current.style.width = buttonRef.current.offsetHeight + "px";
  }, []);

  // Used to distribute the single forwarded ref into multiple refs
  // Parent component uses the methods defined here
  useImperativeHandle(
    ref,
    () => {
      return {
        rotate360: () => {
          rotate360(buttonRef.current);
        },
        unrotate360: () => {
          unrotate360(buttonRef.current);
        },
        shortenBottomBar: () => {
          shorten(bottomBarRef.current);
        },
        widenBottomBar: () => {
          widen(bottomBarRef.current);
        },
      };
    },
    []
  );

  return (
    <button
      className="bg-white-off text-black-off whitespace-nowrap rounded-full bg-opacity-65 shadow-light-grey-3px hover:bg-opacity-80 transition-all duration-300"
      ref={buttonRef}
      onMouseOver={props.openMenu}
      onTouchEnd={props.touchControlMenu}
    >
      <div className="pointer-events-none relative z-[100] aspect-square h-full flex flex-col justify-center items-center transition-all duration-300">
        <div className="w-1/2 h-1/4 flex flex-col justify-between items-start">
          <div className="w-full h-[1px] bg-neutral-700 shadow-hamburger-bars rounded-full"></div>
          <div
            className="w-full h-[1px] bg-neutral-700 shadow-hamburger-bars rounded-full transition-all duration-150"
            ref={bottomBarRef}
          ></div>
        </div>
      </div>
    </button>
  );
});

export default OpenCloseNavButton;
