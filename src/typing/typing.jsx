import React, { useState, useEffect } from "react";
import "./typing.css";
function WrapperT() {
  const [timeLeft, setTimeLeft] = useState(20 * 1000);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <>
      <>
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onTimeUp={() => {}}
        />
        <Typer setIsRunning={setIsRunning} timeLeft={timeLeft} />
      </>
    </>
  );
}

function Timer({ timeLeft, setTimeLeft, isRunning, setIsRunning, onTimeUp }) {
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
      <button
        onClick={() => {
          setTimeLeft(20 * 1000);
          setIsRunning(false);
        }}
        className="reset-button"
      >
        reset
      </button>

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
function Typer({ setIsRunning, timeLeft }) {
  const [wpm, setWpm] = useState(0);

  function Submit(e) {
    e.preventDefault();
    console.log("submitted: " + e.target[0].value);
  }

  //  FIX THE WPM CALCULATION LATER ITS COMPLETELY BROKEN
  //  A WPM IS 5 LETTERS PER WORD, YOU CANT *2 BECAUSE TRUST ME SO FIX LATER
  function Change(e) {
    let inputValue = e.target.value;
    let length1 = inputValue.length;
    let wpm1 = (length1 / 5) * 2;
    if (timeLeft != 0) {
      setWpm(wpm1);
    }
    console.log("Length: " + length1);
    console.log("WPM: " + wpm1);
    console.log("changed: " + e.target.value);
    setIsRunning(true);
  }

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      console.log("Time is up!");
      alert("Time is up! Your WPM is: " + wpm);
    }
  }, [timeLeft, setIsRunning]);

  return (
    <div className="typer">
      <form action="" onSubmit={Submit} id="typer">
        <input
          onChange={Change}
          type="text"
          className="input"
          placeholder="Type... press enter to submit"
        />
      </form>
      <h1 className="wpm">{wpm}</h1>
    </div>
  );
}

export default WrapperT;
