import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Fretboard from "./components/Fretboard";
import "./App.css";

const SOCKET_ENDPOINT = "http://127.0.0.1:5000";

const App = () => {
  
  const [connection, setConnection] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT);
    socket.on("connected", (data) => {
      setConnection(data);
      console.log(data)
    })
    socket.on("notes", (data) => {
      setNotes(data);
      console.log(data)
    })
  }, []);

const printNotes = () => {
  try {
    notes["strings"].forEach((string) => {
      console.log(string)
    })
  } catch (exception) {
    console.log(`Exception: ${String(exception)}`)
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="Random">
          {}
        </div>
      </header>
      <footer className="App-footer">
        <Fretboard strings={6} frets={24} notes={notes}></Fretboard>
      </footer>
    </div>
  );
};
export default App;
