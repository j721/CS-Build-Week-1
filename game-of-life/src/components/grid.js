import React, { useState, useCallback, useRef } from "react";
import produce from 'immer';
import {accidentPattern} from "../patterns/accident";
import {hiPattern} from "../patterns/hi";
import {pentaDecathlon}  from "../patterns/pentaDecathlon";


const numberOfRows = 25;
const numberOfCols = 45;

const speeds ={
    slow: 700, 
    normal: 150,
    fast: 50
}

const patternsContainer ={
    Accident: accidentPattern,
    Hi: hiPattern,
    Penta: pentaDecathlon
}

//tells location of neighboring cells
const operations =[
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
]

const generateEmptyGrid = ()=>{
    const gridRows = []; 
    //for loop where i=0 means cell is dead and i= 1 is alive
    //want to initialize an array of zeros. Have callback function return 0 
    for (let i = 0; i < numberOfRows; i++) {
        gridRows.push(Array.from(Array(numberOfCols), () => 0))
    }
    //Array.from method takes in two parameters: 
    //length of the array and a mapping function that returns the value and a key
    return gridRows;
}

function Grid() {
    //initial state for grid
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid(); 
    })
    console.log(grid)
    
    //initial state for speed
    const [speed, setSpeed] = useState("normal");

    const speedRef = useRef(speed);
    speedRef.current = speed; 

    //initial state for generations
    const [generations, setGenerations] = useState(0);
    //useRef hook to update to current
    const genRef = useRef();
    genRef.current = generations; 
    
    //initial state for running set to false to not run
    const [running, setRunning] = useState(false);
    //useRef hook creates an updated version of current running state
    const runningRef = useRef(); 
    runningRef.current = running

    //useCallback hook to not have to create this function more than once
    const runSimulation = useCallback(()=>{
        if (!runningRef.current){
            return;
        }

        //setGenerations to iterate over item and increment by count +1
        setGenerations((genCount)=>{
            return (genCount = genCount + 1)
        })

        //update value in the grid and mutate them
        setGrid((g)=>{
            return produce(g, gridCopy=>{
                for(let i = 0; i <numberOfRows; i++){
                    for (let k = 0; k < numberOfCols; k++){ 
                        //compute number of neighbors around cell
                        let neighbors = 0; 
                        operations.forEach(([x,y])=>{
                            const newI = i +x;
                            const newK = k +y;
                            //checking the bounds of grid
                            if(newI >= 0  && newI < numberOfRows && newK >=0 && newK < numberOfCols){
                                neighbors +=g[newI][newK] //add 1 to current live cell
                            }
                        })

                        // grid copy will die according to rules
                        if(neighbors < 2 || neighbors > 3){
                            gridCopy[i][k] = 0; 
                        //grid copy will be alive according to rules 
                        }else if (g[i][k] === 0 && neighbors === 3){
                            gridCopy[i][k] = 1; 
                        }
                    }
                }
            })
        })
        setTimeout(runSimulation, speeds[speedRef.current]) 
    },[])


    const patternChange = (e)=>{
        let patternName = e.target.value;

        if(patternName === "None"){
            setGrid(generateEmptyGrid());
        }else{
            setGrid(patternsContainer[patternName])
        }
    }

    const handleSpeed = e=>{
        setSpeed(e.target.value);
    }

    return (
        <>      

        <button className="StartStopToggle" onClick ={()=>{
            setRunning(!running);
            if(!running){
                runningRef.current = true; 
                runSimulation()
            }
        }}>
            {running ? 'stop': 'start'} 
            </button >

     
            <button onClick ={()=>{
                setGrid(generateEmptyGrid())
                setGenerations(0)
            }}>Clear

            </button>

            <button className = "random" onClick ={()=>{
                 const gridRows = []; 
                 for (let i = 0; i < numberOfRows; i++) {                           
                     gridRows.push(Array.from(Array(numberOfCols), () => (Math.random() > 0.7 ? 1: 0)))
                 //if current grid value is greater than 0.7 gets a 1(alive) else less than 0.7 gets 0 (dead)
                 }        
                 setGrid(gridRows); //initial state of setGrid now updated with gridRows array after it has pushed (added new item to end of array)  the updated values from the random number of columns
            }}>Random
            </button>

            <span className="speedBox">
                <label htmlFor ="speed">Speed: </label>
                <select name ="speeds" id ="speeds" onChange = {handleSpeed}>
                    <option value ="normal">Normal</option>
                    <option value = "fast">Fast</option>
                    <option value ="slow">Slow</option>
                </select>
            </span>

            <span className ="patternsContainer">
                <label htmlFor ="patterns">Patterns: </label>
                <select name ="patterns" id ="patterns" onChange ={patternChange}>
                    <option value ="None">None</option>
                    <option value = "Accident">Accident</option>
                    <option value = "Penta">pentaDecathlon</option>
                    <option value = "Hi">Hi</option>
                </select>
            </span>

        <span>Number of Generations: {generations}</span>


        <div className="cells" style={{
            display: 'grid',  
            gridTemplateColumns: `repeat(${numberOfCols}, 20px)`   //CSS grid styling 
        }}>
            {/*map through rows and cols to display grid  */}
            {grid.map((rows, i) => rows.map((cols, j) =>
                <div
                key={`${i}-${j}`} //unique key defined with index of i(rows) and j (cols) for each individual cell 
                    onClick={() => {    //produce from immer library makes a change to grid state but maintains immutability, and creates a copy of grid
                        if(!running){  
                            //makes cells not clickable while running         
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = grid[i][j] ? 0 : 1; //switch between states. if cell currently alive make it dead
                            })
                            setGrid(newGrid)
                        }
                    }}

                    style={{
                        width: 20,
                        height: 20, backgroundColor: grid[i][j] ? 'yellow' : undefined, //if alive yellow, else undefined
                        border: 'solid 1px black'
                    }}>
                </div>))}
        </div>
        </>
    )
}

export default Grid; 