import React, { useState, useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import produce from 'immer';


const numberOfRows = 40;
const numberOfCols = 60;

//column doesn't change, but the row does
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
    const gridRows = []; //rows set to an empty array
    const generations = 0; 

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
        const gridRows = []; //rows set to an empty array
        return generateEmptyGrid(); 
    })
    // console.log(grid)

    //initial state for running set to false to not run
    const [running, setRunning] = useState(false);

    //useRef hook creates an updated version of current running state
    const runningRef = useRef();
    runningRef.current = running

    //useCallback hook to not have to create this function more than once    
    //recursion 
    const runSimulation =useCallback(()=>{
        if (!runningRef.current){
            return;
        }
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
        setTimeout(runSimulation, 100) //run again in 100 milliseconds
    },[])

    return (
        <>
        {/* button to toggle between start and stop state */}
        <button onClick ={()=>{
            setRunning(!running);
            if(!running){
                runningRef.current = true; 
                runSimulation()
            }
        }}>
            {running ? 'stop': 'start'} 
            </button >

        {/* Clear button */}
            <button onClick ={()=>{
                setGrid(generateEmptyGrid())
            }}>Clear

            </button>

            {/* Random button */}
            <button onClick ={()=>{
                 const gridRows = []; 
                 for (let i = 0; i < numberOfRows; i++) {                           
                     gridRows.push(Array.from(Array(numberOfCols), () => (Math.random() > 0.7 ? 1: 0)))
                 //if current grid value is greater than 0.7 gets a 1(alive) else less than 0.7 gets 0 (dead)
                 }        
                 setGrid(gridRows); //initial state of setGrid now updated with gridRows array after it has pushed (added new item to end of array)  the updated values from the random number of columns
            }}>Random

            </button>

            <button onClick ={()=>{
                setTimeout(runSimulation(), 90000)
            }}>Fast</button>

            {/* <button>Slow</button> */}

        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numberOfCols}, 20px)`   //CSS grid styling 
        }}>
            {/*map through rows and cols to display grid  */}
            {grid.map((rows, i) => rows.map((cols, j) =>
                <div

                    onClick={() => {    //produce from immer library makes a change to grid state but maintains immutability, and creates a copy of grid
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][j] = grid[i][j] ? 0 : 1; //switch between states. if cell currently alive make it dead
                        })
                        setGrid(newGrid)
                    }}

                    key={`${i}-${j}`} //unique key defined with index of i(rows) and j (cols) for each individual cell 
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