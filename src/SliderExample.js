import React, { useState, useEffect } from "react";
import "./slide.css";
import { data } from "./data";

const SlideExample = () => {
  const [product, setProduct] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = product.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }
  }, [index, product]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <>
      <div className="section-center">
        {product.map((item, indexItem) => {
          const { id, title, text, image } = item;
          let position = "nextSlide";
          if (indexItem === index) {
            position = "activeSlide";
          }
          if (
            indexItem === index - 1 ||
            (index === 0 && indexItem === product.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article key={id} className={position}>
              <img src={image} alt={title} width="300px" />
              <h4>{title}</h4>
              <h4>{text}</h4>
            </article>
          );
        })}
        <button onClick={() => setIndex(index - 1)}>LEFT</button>
        <button onClick={() => setIndex(index + 1)}>RIGHT</button>
      </div>
    </>
  );
};

export default SlideExample;
