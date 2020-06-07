import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Fretboard from "./components/Fretboard";
import "./App.css";

const App = () => {
  const [response, setResponse] = useState("");
  
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
