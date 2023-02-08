import { useContext } from "react";

import TimeoutContext from "../timeout-context/Timeout-Context-Two-Tier";

import classes from "./TimeoutModal.module.css";

function TimeoutModal() {
  const TimeoutCtx = useContext(TimeoutContext);

  function touchToContinueHandler(event) {
    TimeoutCtx.removeUITimer(event);
  }

  if (TimeoutCtx.UITimerActive) {
    return (
      <div className={classes.backdrop} onClick={touchToContinueHandler}>
        <div className={classes["flex-vertical"]}>
          <div className={classes.modal}>
            <h1>Are you still there?</h1>
            <h1>Tap anywhere to continue</h1>
            <h1>
              Countdown remaining <span>{TimeoutCtx.UITimerCountdown}</span>
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default TimeoutModal;
