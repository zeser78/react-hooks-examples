import React, { useEffect, useState } from "react";

import { data } from "./data";

const ScrollExample = () => {
  const [size, setSize] = useState(window.innerWidth);
  const [sizeHeight, setSizeHeight] = useState(window.innerHeight);
  const [distance, setDistance] = useState(window.innerHeight);

  const checkSize = () => {
    setSize(window.innerWidth);
    setSizeHeight(window.innerHeight);
  };

  console.log(data);

  // let elem = document.getElementById('divCenter')

  const checkSizeHeight = () => {
    setSizeHeight(window.innerHeight);
    console.log(sizeHeight);
  };

  // console.log( elem.scrollTop)
  useEffect(() => {
    let elem = document.getElementById("divCenter");
    window.addEventListener("resize", checkSize);
    window.addEventListener("scroll", () => {
      console.log(
        sizeHeight,
        elem.getBoundingClientRect().top,
        window.innerHeight
      );
      setDistance(elem.getBoundingClientRect().top);
    });
    console.log(sizeHeight);

    // return () => {
    //   window.removeEventListener('resize', checkSize)
    // }
  });
  return (
    <div className="App" style={{ height: `200vh` }}>
      {data.map((data) => (
        <div>
          <h2>{data.text}</h2>
          <h2>{data.text}</h2>
        </div>
      ))}
      {size} px
      <div id="divCenter">
        <div>
          <h1>Center Text</h1>
          <p>{sizeHeight} px</p>
          <p> distance top {distance} px</p>
          {data.map((data) => (
            <div style={{ display: `flex`, flexDirection: `row` }}>
              <div>
                <h2>{data.text}</h2>
              </div>
              <div>
                {sizeHeight / 2 > distance ? (
                  <img src={data.image} width="300px" />
                ) : (
                  <div style={{ width: `300px` }}></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollExample;

// document.addEventListener("DOMContentLoaded", function(event) {
//   var hash = window.decodeURI(location.hash.replace('#', ''))
//   if (hash !== '') {
//     var element = document.getElementById(hash)
//     if (element) {
//       var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//       var clientTop = document.documentElement.clientTop || document.body.clientTop || 0
//       var offset = element.getBoundingClientRect().top + scrollTop - clientTop
//       // Wait for the browser to finish rendering before scrolling.
//       setTimeout((function() {
//         window.scrollTo(0, offset - 0)
//       }), 0)
//     }
//   }
// })
