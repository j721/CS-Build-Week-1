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
      <div className= "container">
      <>
        <h1>Conway's Game of Life Algorithm</h1>
        <p>The game is based on cellular automaton,a grid of cells that can either have the state of being dead or alive.</p>
      </>
      <>
        <h2>Rules of the Game</h2>
        <p>A live cell with fewer than 2 live neighbors dies.
        A live cell with 2 or 3 live neighbors stays alive.
        A live cell with more than 3 live neighbors dies.
        A dead cell with exactly 3 live neighbors comes alive.
      </p>
      </>
      </div>
    </div>
  );
}

export default App;
