import React from "react";
import logo from "../logo.svg";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const { isSidebarOpen, closesidebar } = useGlobalContext();
  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div>
        <img src={logo} alt="logo" width="100px" />
        <button className="close-btn" onClick={closesidebar}>
          CLOSE
        </button>
      </div>
      <ul className="links">
        <li>
          <a href="#">about</a>
        </li>
        <li>
          <a href="#">products</a>
        </li>
        <li>
          <a href="#">contact</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
