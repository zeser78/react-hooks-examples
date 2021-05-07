import React, { useState } from "react";

const Categories = ({ categories, filterItems }) => {
  return (
    <>
      <h1>Categories</h1>
      <div>
        {categories.map((category, index) => {
          return (
            <button
              type="button"
              key={index}
              style={{ margin: `10px` }}
              onClick={() => filterItems(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
      {/* <button onClick={() => filterItems("all")}>All</button>
      <button onClick={() => filterItems("finance")}>Finance</button> */}
    </>
  );
};

export default Categories;
