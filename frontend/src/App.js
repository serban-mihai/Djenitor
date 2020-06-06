import React from "react";
import Fretboard from "./components/Fretboard";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Fretboard strings={6} frets={24}></Fretboard>
      </header>
    </div>
  );
};
export default App;
