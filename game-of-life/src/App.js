import React from 'react';
import { Route, Router } from "react-router-dom";
import './App.css';
import Grid from "./components/grid";
import Home from "./components/home"

function App() {
  return (
      <div className="App">
        <header className="App-header"> 
         <h1>Welcome to Conway's Game of Life</h1>
          <Grid />
        </header>
    </div>
  );
}

export default App;
