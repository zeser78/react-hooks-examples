import React, { useState } from "react";

const Menu = (items) => {
  const menuItem = items.items;
  return (
    <>
      <h1>Menu</h1>
      {console.log(menuItem)}
      {menuItem.map((item) => {
        // const [id, title, text, description, image] = menuItem;
        return (
          <article key={item.id}>
            <img src={item.image} alt={item.title} width="300px" />
            <div>
              <header>
                <h4>{item.title}</h4>
                <h4>${item.price}</h4>
              </header>
              <p>{item.description}</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Menu;
