import React, { useState } from "react";
import { data } from "../data";
import Categories from "./Categories";
import Menu from "./Menu";

const allCategories = ["all", ...new Set(data.map((item) => item.category))];
// const allCategories = data.map((item) => item.category);
console.log(allCategories);

const MenuApp = () => {
  const [menuItems, setMenuItems] = useState(data);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(data);
      return;
    }
    const newItems = data.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <>
      <h1>Menu</h1>
      <Categories categories={categories} filterItems={filterItems} />
      <Menu items={menuItems} />
    </>
  );
};

export default MenuApp;
