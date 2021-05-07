import React, { useContext } from "react";

import { AppContext, useGlobalContext } from "./context";

const Home = () => {
  //   const data = useContext(AppContext);
  const { openSidebar, openModal } = useGlobalContext();
  //   console.log(data);
  return (
    <main>
      <button onClick={openSidebar}>BAR</button>
      <button onClick={openModal}>show modal</button>
    </main>
  );
};

export default Home;
