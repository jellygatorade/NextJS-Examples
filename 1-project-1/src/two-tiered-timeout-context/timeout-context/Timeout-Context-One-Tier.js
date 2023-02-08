import { createContext, useRef, useEffect } from "react";

import { idleTimer } from "./idle-timer-class-one-tier";

const idleTimeoutInMilliseconds = 5 * 1000; // 5s for development
//const idleTimeoutInMilliseconds = 90 * 1000; // 90s for production

let theIdleTimer;

// Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
// https://beta.reactjs.org/learn/passing-data-deeply-with-context

// Utilizing useRef here as exemplified here
// https://stackoverflow.com/questions/71499969/settimeout-and-cleartimeout-in-react

// capitalized because createContext returns a React component
const TimeoutContext = createContext({
  // The methods below don't actually do anything, but they are added to the initial context so that the IDE autocompletes them (for use with context later)
  // This is a best practice with React context
  setupBackgroundTimer: () => {},
  removeBackgroundTimer: () => {},
});

// This component must wrap the nodes you want to use the context in (see index.js)
export function TimeoutContextProvider(props) {
  const backgroundTimerTimeoutId = useRef(null);

  // Create the idle timer once!
  useEffect(() => {
    theIdleTimer = new idleTimer(
      backgroundTimerTimeoutId,
      idleTimeoutInMilliseconds
    );
  }, []);

  function setupBackgroundTimerHandler() {
    theIdleTimer.setup();
  }

  function removeBackgroundTimerHandler() {
    theIdleTimer.remove();
  }

  const context = {
    setupBackgroundTimer: setupBackgroundTimerHandler,
    removeBackgroundTimer: removeBackgroundTimerHandler,
  };

  return (
    <TimeoutContext.Provider value={context}>
      {props.children}
    </TimeoutContext.Provider>
  );
}

export default TimeoutContext;
