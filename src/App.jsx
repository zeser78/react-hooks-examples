// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import UseReducer from "./UseReducer";
import UseContext from "./UseContext";
// import UseStatePrev from "./useStatePrev";
// import UseEffectMultiple from "./useEffectMultiples";
// import UseRef from "./useRef";
// import ScrollExample from "./ScrollExample";
// import FirestoreStorageExample from "./FirebaseExample/FirebaseStorageExample";
// import Home from "./FirebaseExample/Home";
// import Builder from "./Three-files/Builder";
// import BuilderMaterial from "./Three-files/BuilderMaterial";
// import BuilderLight from "./Three-files/BuilderLight";
// import BuilderPhisics from "./Three-files/BuilderPhisics";
// import BuilderLoader from "./Three-files/BuilderLoader";
// import BuilderShader from "./Three-files/BuilderShader";
// import FetchingApp from "./FetchData/FetchingApp";
// import CarouselExample from "./CarouselExamples";
// import MenuApp from "./MenuExamples/MenuApp";
// import SlideExample from "./SliderExample";
// import NavBarExample from "./NavBarExample";
// import SidebarApp from "./Sidebar/SidebarApp";
// import RangeSlider from "./RangeSlider";
// import SliderExampleSimple from "./SliderExampleSimple";

import BarsTimer from "./BarsTimer";
import Parent from "./PassingDataParentChildren";

function App() {
  return (
    <div className="App">
      <UseReducer/>
      <UseContext />
      {/* <UseStatePrev />*/}
      {/* <UseEffectMultiple /> */}
      {/* <UseRef />*/}
      {/* <ScrollExample /> */}
      {/* <FirestoreStorageExample /> */}
      {/* using this for firestore auth */}
      {/* <Home /> */}
      {/* <BuilderMaterial /> */}
      {/* <FetchingApp /> */}
      {/* <CarouselExample /> */}
      {/* <SliderExampleSimple /> */}
      {/* <MenuApp /> */}
      {/* <SlideExample /> */}
      {/* <NavBarExample /> */}
      {/* <SidebarApp /> */}
      {/* <BuilderLoader /> */}
      {/* <RangeSlider /> */}
      <h1>React</h1>
      {/* <BarsTimer /> */}
      <Parent />
    </div>
  );
}

export default App;
