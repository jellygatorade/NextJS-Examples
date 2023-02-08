import { createContext, useEffect, useState, useRef } from "react";

import { idleTimer } from "./idle-timer-class-two-tier";

let theIdleTimer;

const timeoutInMilliseconds = 1000 * 5; // 5 seconds for development
//const timeoutInMilliseconds = 1000 * 90; // 90 seconds for production
const countdownAmountInMilliseconds = 15000;

// capitalized because createContext returns a React component
const TimeoutContext = createContext({
  // The methods below don't actually do anything, but they are added to the initial context so that the IDE autocompletes them (for use with context later)
  // This is a best practice with React context
  setupBackgroundTimer: () => {},
  removeBackgroundTimer: () => {},
  UITimerActive: undefined,
  UITimerCountdown: undefined,
  removeUITimer: () => {},
});

// This component must wrap the nodes you want to use the context in (see index.js)
export function TimeoutContextProvider(props) {
  const backgroundTimerTimeoutId = useRef(0); // Important! Keeping the timeoutId in a useRef hook

  const UITimerCountdownIntervalId = useRef(0); // Important!
  const UITimerDoInactiveTimeoutId = useRef(0); // Important!

  // "To update context, you need to combine it with state."
  // https://beta.reactjs.org/reference/react/useContext#updating-data-passed-via-context

  const [UITimerCountdownRemaining, setUITimerCountdownRemaining] = useState(
    countdownAmountInMilliseconds / 1000
  );
  const [UITimerIsRunning, setUITimerIsRunning] = useState(false);

  // Create the idle timer once!
  useEffect(() => {
    const reactiveParams = {
      backgroundTimerTimeoutId: backgroundTimerTimeoutId,
      UITimerCountdownIntervalId: UITimerCountdownIntervalId,
      UITimerDoInactiveTimeoutId: UITimerDoInactiveTimeoutId,
      setUITimerCountdownRemaining: setUITimerCountdownRemaining,
      setUITimerIsRunning: setUITimerIsRunning,
    };

    theIdleTimer = new idleTimer(
      reactiveParams,
      timeoutInMilliseconds,
      countdownAmountInMilliseconds
    );
  }, []);

  function setupBackgroundTimerHandler() {
    theIdleTimer.setup();
  }

  function removeBackgroundTimerHandler() {
    theIdleTimer.remove();
  }

  function removeUITimerHandler(event) {
    theIdleTimer.cancel(event);
  }

  const context = {
    setupBackgroundTimer: setupBackgroundTimerHandler,
    removeBackgroundTimer: removeBackgroundTimerHandler,
    UITimerActive: UITimerIsRunning,
    UITimerCountdown: UITimerCountdownRemaining,
    removeUITimer: removeUITimerHandler,
  };

  return (
    <TimeoutContext.Provider value={context}>
      {props.children}
    </TimeoutContext.Provider>
  );
}

export default TimeoutContext;
