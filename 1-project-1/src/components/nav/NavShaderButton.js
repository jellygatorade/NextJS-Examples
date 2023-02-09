import { forwardRef } from "react";

const NavShaderButton = forwardRef((props, ref) => {
  return (
    <button
      className="px-[0.5em] opacity-1 scale-100 py-[3px] bg-white-off text-black-off whitespace-nowrap rounded-full bg-opacity-65 shadow-light-grey-3px hover:scale-90 hover:bg-opacity-80 transition-all duration-300"
      ref={ref}
    >
      <div className="h-full flex flex-col justify-center items-center">
        <div className="h-1/2 w-[150%] border border-neutral-700 rounded-sm"></div>
        <div className="mt-[2px] w-full h-[1px] bg-neutral-700 shadow-light-grey-1px rounded-full"></div>
      </div>
    </button>
  );
});

export default NavShaderButton;
