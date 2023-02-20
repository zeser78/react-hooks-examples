
import React, { useState } from 'react';
export default function Parent() {
    const [childData, setChildData] = useState(null);
    const [toggleValue, setToggleValue] = useState(false);
  
    const handleChildData = (data, toggle) => {
      setChildData(data);
      setToggleValue(toggle);
    };
  
    return (
      <div>
        <h2>Parent</h2>
        <Children onChildData={handleChildData} />
        <Game timer={childData}/>
        {childData && <p>Data received from child: {childData}</p>}
        {toggleValue && (
          <p>Toggle value received from child: {toggleValue.toString()}</p>
        )}
      </div>
    );
  }
  
  function Children(props) {
    const [toggle, setToggle] = useState(false);
  
    const handleClick = () => {
      const data = 'Some data from child component';
      const newToggleValue = !toggle;
      setToggle(newToggleValue);
      props.onChildData(data, newToggleValue);
    };
  
    return (
      <div>
        <h3>Child Component</h3>
        <button onClick={handleClick}>
          {toggle ? 'Set Toggle to False' : 'Set Toggle to True'}
        </button>
      </div>
    );
  }

  function Game (props) {
    return (
        <div>
            {/* <h1>Game {props.childData ? props.childData.toString() : "N/A"}</h1> */}
            <h1>Game {props.timer ? props.timer.toString() : "N/A"}</h1>
        </div>
    )
  }