import React, { useEffect, useState, useRef } from "react";

// Preserves value
// Doesn NOT trigger re-render
// target DOM nodes/elements

const UseRef = () => {
  // useRef doesn't cause a component to re-update when it change

  const [name, setName] = useState("");
  // const [renderCount, setRenderCount ] = useState(0)
  const renderCount = useRef(1);

  useEffect(() => {
    // setRenderCount(prevRenderCount => prevRenderCount + 1)
    // with useState re-render infinity loop
    renderCount.current = renderCount.current + 1;
  });
  // using ot save the preview data
  const prevName = useRef("");
  useEffect(() => {
    console.log("useRef", prevName, prevName.current, name);
    prevName.current = name;
  }, [name]);

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>My name us {name}</div>
      <div> I rendered {renderCount.current} times</div>
      <div>
        My name is {name} and it used to be {prevName.current}
      </div>
    </>
  );
};

export default UseRef;
