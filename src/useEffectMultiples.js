import React, { useState, useEffect } from "react";

const UseEffectMultiple = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
      console.log('render 1')
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const [screen, setScreen] = useState("")
  useEffect(() => {
      console.log('render 2')
    const title = width < 990 ? "It's a tablet " : "It's a pc";
    setScreen(title)
    document.title = title;
    return () => document.title = "";
  }, [width]);

  return (
  <>
  <h1>useEffect Multiple</h1>
  <h1>{width}</h1>
  <h1>{screen}</h1>
  </>
  );
}

export default UseEffectMultiple