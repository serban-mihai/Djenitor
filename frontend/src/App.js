import React from "react";
import Fretboard from "./components/Fretboard";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <footer className="App-footer">
        <Fretboard strings={6} frets={24}></Fretboard>
      </footer>
    </div>
  );
};
export default App;
