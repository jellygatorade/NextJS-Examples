/***************************************************************************
 * One tier example - remember to use correct import statement in index.js
 ***************************************************************************/

// import { useContext } from "react";

// import TimeoutContext from "../timeout-context/Timeout-Context-One-Tier";

// function TimeoutControls() {
//   const TimeoutCtx = useContext(TimeoutContext);

//   function setupBackgroundTimer() {
//     TimeoutCtx.setupBackgroundTimer();
//   }

//   function removeBackgroundTimer() {
//     TimeoutCtx.removeBackgroundTimer();
//   }
//   return (
//     <div style={{ margin: "1rem" }}>
//       <button style={{ margin: "0.1rem" }} onClick={removeBackgroundTimer}>
//         Suspend timeout timer
//       </button>
//       <button style={{ margin: "0.1rem" }} onClick={setupBackgroundTimer}>
//         Start timeout timer
//       </button>
//     </div>
//   );
// }

// export default TimeoutControls;

//
//
//
//
//

/***************************************************************************
 * Two tier example - remember to use correct import statement in index.js
 ***************************************************************************/

import { useContext } from "react";

import TimeoutContext from "../timeout-context/Timeout-Context-Two-Tier";

function TimeoutControls() {
  const TimeoutCtx = useContext(TimeoutContext);

  function setupBackgroundTimer() {
    TimeoutCtx.setupBackgroundTimer();
  }

  function removeBackgroundTimer() {
    TimeoutCtx.removeBackgroundTimer();
  }

  function removeUITimer(event) {
    TimeoutCtx.removeUITimer(event);
  }

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <button style={{ margin: "0.1rem" }} onClick={removeBackgroundTimer}>
          Suspend timeout timer
        </button>
        <button style={{ margin: "0.1rem" }} onClick={setupBackgroundTimer}>
          Start timeout timer
        </button>
      </div>
      <div style={{ margin: "1rem" }}>
        <button style={{ margin: "0.1rem" }} onClick={removeUITimer}>
          Remove Tier 2 Timer (only accessible if no modal)
        </button>
      </div>
    </div>
  );
}

export default TimeoutControls;
