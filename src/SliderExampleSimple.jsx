import React from "react";

import first from "./images/1.jpg";
import second from "./images/2.jpg";
import third from "./images/3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const SliderExampleSimple = () => {
  return (
    <div>
      <Carousel showArrows={true} autoPlay={false} showThumbs={false}>
        <div>
          <img src={first} />
          <p>Legend 1</p>
        </div>
        <div>
          <img src={second} />
          <p>Legend 2</p>
        </div>
        <div>
          <img src={third} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};
export default SliderExampleSimple;
