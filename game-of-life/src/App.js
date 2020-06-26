import React from 'react';
import './App.css';
import Grid from "./components/grid";
// import Collapse from 'react-bootstrap/Collapse';
// import Fade from 'react-bootstrap/Fade';
// import Button from 'react-bootstrap/Button';

// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';


function App() {
  // const [open, setOpen] = React.useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <h1> The Game of Life</h1> 
        <Grid />
      </header>
      {/* <button className="Modal" onClick={()=>setOpen(true)}>Learn More about the Game</button>
      <Modal open={open} onClose={() => setOpen(false)} center> */}
      <div className="container">
        <div className ="about">
          <h2>Conway's Game of Life Algorithm</h2>
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
      {/* </Modal> */}
    </div>
  );
}

export default App;
