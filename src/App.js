import React from 'react';
import logo from './logo.svg';
import './App.css';
import UseReducer from './UseReducer';
import UseContext from './UseContext';
import UseStatePrev from './useStatePrev';
import UseEffectMultiple from './useEffectMultiples';
import UseRef from './useRef';
import ScrollExample from './ScrollExample';
import FirestoreStorageExample from './FirebaseExample/FirebaseStorageExample';
import Home from './FirebaseExample/Home';

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
      <Home />
    </div>
  );
}

export default App;
