import React from "react";
import SingleComponent from "./SingleComponent";

const FetchComponent = ({ products, removeProduct }) => {
  return (
    <section>
      <div>
        <h2>Products</h2>
        <div></div>
      </div>
      <div style={{ width: `500px` }}>
        {products.map((item) => {
          return (
            <SingleComponent
              key={item.id}
              {...item}
              removeProduct={removeProduct}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FetchComponent;
