import React, {useState} from 'react';
import './App.css';
import Grid from "./components/grid";

function App () {
  return (

    <div className="App">
      <header className="App-header">
          <h1>Welcome to Conway's Game of Life</h1>
          <Grid/>
      </header>
    </div>

  );
}

export default App;
