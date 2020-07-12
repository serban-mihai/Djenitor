import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Fretboard from "./components/Fretboard";
import Logo from "./logo192.png";
import "./App.css";
import ControlPanel from "./components/ControlPanel";

const ENDPOINT = "https://api.djenitor.com";

const App = () => {
  
  const [connected, setConnected] = useState(false);
  const socket = socketIOClient(ENDPOINT, {reconnection: false});

  useEffect(() => {
    socket.on("connected", () => {
      setConnected(true);
    });

    socket.on("error", (err) => {
      console.log(`Socket.IO Front-end Error: ${err}`);
    });
    
    return () => {
      socket.off("disconnected");
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ControlPanel endpoint={ENDPOINT}></ControlPanel>
      </header>
      <footer className="App-footer">
        <Fretboard strings={8} frets={24} socket={socket}></Fretboard>
      </footer>
    </div>
  );
};
export default App;
