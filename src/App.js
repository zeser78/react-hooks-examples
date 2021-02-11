import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UseReducer from "./UseReducer";
import UseContext from "./UseContext";
import UseStatePrev from "./useStatePrev";
import UseEffectMultiple from "./useEffectMultiples";
import UseRef from "./useRef";
import ScrollExample from "./ScrollExample";
import FirestoreStorageExample from "./FirebaseExample/FirebaseStorageExample";
import Home from "./FirebaseExample/Home";
import Builder from "./Three-files/Builder";
import BuilderMaterial from "./Three-files/BuilderMaterial";
import BuilderLight from "./Three-files/BuilderLight";
import BuilderPhisics from "./Three-files/BuilderPhisics";
import BuilderLoader from "./Three-files/BuilderLoader";
import BuilderShader from "./Three-files/BuilderShader";

function App() {
  return (
    <div className="App">
      {/* <UseReducer/>
      <UseContext /> */}
      {/* <UseStatePrev />
      <UseEffectMultiple />
      <UseRef /> */}
      {/* <ScrollExample /> */}
      {/* <FirestoreStorageExample /> */}
      {/* using this for firestore auth */}
      {/* <Home /> */}
      <BuilderShader />
    </div>
  );
}

export default App;
