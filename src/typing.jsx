import React, { useState, useEffect } from "react";

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(60 * 1000); // milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 10, 0));
      }, 10); // update every 10ms
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      onTimeUp();
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onTimeUp]);

  return (
    <>
      <h1>This is an alpha version. im still working on this.</h1>
      <button onClick={() => setIsRunning(true)}>start</button>
      <button
        onClick={() => {
          setTimeLeft(60 * 1000);
          setIsRunning(false);
        }}
      >
        reset
      </button>
      <button onClick={() => setIsRunning(false)}>stop</button>

      <div className="timer">
        <h1>
          {Math.floor(timeLeft / 1000)}.
          {String(Math.floor((timeLeft % 1000) / 10)).padStart(2, "0")} Seconds
          Left!
        </h1>
      </div>
    </>
  );
}
function Typer() {
  function Submit(e) {
    e.preventDefault();
    console.log("submitted: " + e.target[0].value);
  }
  return (
    <>
      <form action="" onSubmit={Submit}>
        <input type="text" placeholder="Type... press enter to submit" />
      </form>
    </>
  );
}

export default Timer;
export { Typer };
