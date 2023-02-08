/***************************************************************************
 * The idleTimer class expects:
 *
 * Reactive parameters (explained below)
 * Idle timeout time in milliseconds
 * Modal countdown total in milliseconds
 *
 * Reactive parameters are
 * 3 refs for tracking timeout and interval ids (one in first tier, two in second tier)
 * 2 state slices for activiting the second tier countdown, and displaying the countdown remaining
 ***************************************************************************/

class idleTimer {
  constructor(reactiveParams, timeout, countdown) {
    this.idleTimeoutIdRef = reactiveParams.backgroundTimerTimeoutId; // first reactive ref
    this.idleTimeoutInMilliseconds = timeout;

    // Important! _setup()  _remove() and _cancal() methods must be bound and stored so that
    // this keyword refers to the current instance of idleTimer
    this.setup = this._setup.bind(this); // starts tier 1
    this.remove = this._remove.bind(this); // removes tier 1, and thus prevents tier 2
    this.cancel = this._cancel.bind(this); // cancels tier 2 during its countdown

    // Important! _resetTimer() method must be bound and stored so that
    // 1) this keyword refers to the current instance of idleTimer
    // 2) the reference to the bound function can be removed as an event listener, after being added as an event listener
    //    (using addEventListener("click", this.method.bind(this)) does not work because bind() returns a new function))
    this._boundResetTimer = this._resetTimer.bind(this);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Tier 2 init stuff
    this.countdownAmountInSeconds = countdown / 1000;
    this.timeLeft = this.countdownAmountInSeconds - 1;

    // Copy the reactive parameters to be utilized here
    this.uiTimerIntervalRef = reactiveParams.UITimerCountdownIntervalId; // second reactive ref
    this.uiTimerTimeoutRef = reactiveParams.UITimerDoInactiveTimeoutId; // third reactive ref
    this.setUITimerCountdownRemaining =
      reactiveParams.setUITimerCountdownRemaining; // first state slice
    this.setUITimerIsRunning = reactiveParams.setUITimerIsRunning; // second state slice
  }

  /**************************
   * Tier 1 Methods
   **************************/

  _start() {
    this.idleTimeoutIdRef.current = window.setTimeout(
      this._doInactive.bind(this),
      this.idleTimeoutInMilliseconds
    );
  }

  _doInactive() {
    console.log("doInactive");

    // Action taken on inactivity
    // Refresh to homepage
    //window.location.reload();

    // Stop listening for user activity
    this.remove();

    this._loadIdleTimerTier2();
  }

  _goActive() {
    console.log("Go active");
    this._start();
    // Do something along with startIdleTimer
  }

  _resetTimer() {
    window.clearTimeout(this.idleTimeoutIdRef.current);
    this._goActive();
  }

  _setup() {
    // if this.idleTimeoutIdRef.current === 0, then setup will not run again
    if (!this.idleTimeoutIdRef.current) {
      console.log("Set up idle timer");

      // Each of these events will reset the timer ("mousemove", "mousedown", etc)
      window.addEventListener("mousemove", this._boundResetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
      window.addEventListener("mousedown", this._boundResetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
      window.addEventListener("keydown", this._boundResetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
      window.addEventListener("DOMMouseScroll", this._boundResetTimer, false); // deprecated for "wheel"
      window.addEventListener("mousewheel", this._boundResetTimer, false); // deprecated for "wheel"
      window.addEventListener("wheel", this._boundResetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
      window.addEventListener("touchmove", this._boundResetTimer, false); // fired when one or more touch points are moved along the touch surface
      window.addEventListener("touchstart", this._boundResetTimer, false); // fired when one or more touch points are placed on the touch surface
      window.addEventListener("pointermove", this._boundResetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

      this._start();
    }
  }

  _remove() {
    window.removeEventListener("mousemove", this._boundResetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.removeEventListener("mousedown", this._boundResetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.removeEventListener("keydown", this._boundResetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.removeEventListener("DOMMouseScroll", this._boundResetTimer, false); // deprecated for "wheel"
    window.removeEventListener("mousewheel", this._boundResetTimer, false); // deprecated for "wheel"
    window.removeEventListener("wheel", this._boundResetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.removeEventListener("touchmove", this._boundResetTimer, false); // fired when one or more touch points are moved along the touch surface
    window.removeEventListener("touchstart", this._boundResetTimer, false); // fired when one or more touch points are placed on the touch surface
    window.removeEventListener("pointermove", this._boundResetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action

    window.clearTimeout(this.idleTimeoutIdRef.current);
    this.idleTimeoutIdRef.current = 0;

    console.log("removeIdleTimer called");
  }

  /**************************
   * Tier 2 Methods
   **************************/

  _countdownIterator() {
    console.log(this.timeLeft);
    if (this.timeLeft <= 0) {
      clearInterval(this.uiTimerIntervalRef.current);
      // CHANGE COUNT STATE TO 0
      this.setUITimerCountdownRemaining(0);
      this.timeLeft = this.countdownAmountInSeconds - 1;
      clearTimeout(this.uiTimerTimeoutRef.current);
      // Reset the application
      this.uiTimerTimeoutRef.current = setTimeout(
        this._doInactive2.bind(this),
        1000
      );
    } else {
      // CHANGE COUNT STATE TO this.timeLeft
      this.setUITimerCountdownRemaining(this.timeLeft);
    }
    this.timeLeft -= 1;
  }

  _runIdleTimerTier2() {
    this.uiTimerIntervalRef.current = setInterval(
      this._countdownIterator.bind(this),
      1000
    );
  }

  _loadIdleTimerTier2() {
    // CHANGE COUNT STATE TO 15
    this.setUITimerCountdownRemaining(15);
    // CHANGE ACTIVE STATE TO TRUE
    this.setUITimerIsRunning(true);

    this.timeLeft = this.countdownAmountInSeconds - 1;
    this._runIdleTimerTier2();
  }

  _doInactive2() {
    console.log("Do inactive - tier 2");
    window.location.reload();
  }

  _cancel(event) {
    event.stopPropagation();

    clearInterval(this.uiTimerIntervalRef.current);
    this.timeLeft = this.countdownAmountInSeconds - 1;
    this._setup(); // tier 1

    // CHANGE ACTIVE STATE TO FALSE
    this.setUITimerIsRunning(false);
  }
}

export { idleTimer };
