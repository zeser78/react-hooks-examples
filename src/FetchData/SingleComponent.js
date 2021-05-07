import React, { useState } from "react";

const SingleComponent = ({ id, image, info, price, name, removeProduct }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <article>
      <img src={image} alt={name} width="200px" />
      <footer>
        <div>
          <h4>{name}</h4>
          <h4>${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}{" "}
          <button
            style={{ border: `none`, background: `transparent` }}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "show less" : "read more"}
          </button>
        </p>
        <button onClick={() => removeProduct(id)}>not interested</button>
      </footer>
    </article>
  );
};

export default SingleComponent;
