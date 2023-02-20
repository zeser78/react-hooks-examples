import { useState, useEffect } from "react";
import "./App.css";

function Bar() {
  const background = "bar-blue"
  return <div className= {`bar ${background}`}/>;
}
let miliseconds = 10000;

export default function BarsTimer() {
  const [bars, setBars] = useState(() => Array(10).fill(null));
  const [time, setTime] = useState(miliseconds);
  const [seconds, setSeconds] = useState(0);

 

  useEffect(() => {
    // Create the bars x 10 times
    const newBars = [...bars];
    for (let i = 0; i < 10; i++) {
      newBars[i] = <Bar key={i} color />;
    }
    setBars(newBars);

    // Start the timer
    const intervalId = setInterval(() => {
      setTime((t) => t - 1000);
    }, 1000);
    if (time === 0) {
      clearInterval(intervalId);
      console.log("time is 0");
    }
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    // Update the time display every second
    setSeconds(Math.ceil(time / 1000));
 
  }, [time]);

  useEffect(() => {
 
    // setTime((t) => t - 100);
    // Hide a bar every 10% of the time
    console.log(time, miliseconds);
    const percent = Math.floor((time / miliseconds) * 100);
    const index = percent / 10;
    if (percent % 10 === 0) {
      console.log(percent, index);
      // slice the array and remove the bar
      // Change the color of the bar
      if ( index === 6) {
        const bar = document.getElementsByClassName("bar");
        if (bar) {
          console.log(typeof bar);
        Array.from(bar).forEach((b) => {
          b.classList.add("bar-yellow");
          b.classList.remove("bar-blue");
        //   b.style.cssText = `
        //   background: linear-gradient(to bottom,
        //     #e6c847 0 50%,
        //     #daa825 50% 80%,
        //     #c88a00 80%);
        //   transition: all 2s ease;
        // `
        })
      }
    } else if (index === 3) {
      const bar = document.getElementsByClassName("bar");
      if (bar) {
        console.log(typeof bar);
      Array.from(bar).forEach((b) => {
        b.style.cssText = `
          background-color:  pink;
          transition: all 0.5s ease;
        `
        // b.classList.add("bar-red");
        // b.classList.remove("bar-yellow");
      })
    }
    }
  }
      setBars((b) => b.slice(0, index));
    // } else {
    //   // keep the bars
    //   setBars((b) => b.slice(0, index));
    // }
  }, [time]);

  return (
    <div className="App">
      <div className="container">{bars}</div>
  
      <div id="time">{seconds} seconds</div>
    </div>
  );
}

