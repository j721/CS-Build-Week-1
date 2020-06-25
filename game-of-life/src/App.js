import React from 'react';
import { Route, Router } from "react-router-dom";
import './App.css';
import Grid from "./components/grid";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> The Game of Life</h1>
      
        <Grid />
      </header>
      <div className="container">
        <div className ="about">
          <h1>Conway's Game of Life Algorithm</h1>
          <p>The game is based on cellular automaton,a grid of cells that can either have the state of being dead or alive.</p>
        </div>
        <div className ="rules">
          <h2>Rules of the Game</h2>
          <p> 1. A live cell with fewer than two live neighbors dies. 
            <br></br><br></br>
          2. A live cell with two or three live neighbors stays alive. <br></br><br></br>
          3. A live cell with more than three live neighbors dies.<br></br><br></br>
          4. A dead cell with exactly three live neighbors comes alive.<br></br>
      </p>
        </div>
      </div>
    </div>
  );
}

export default App;
