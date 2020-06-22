import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import produce from 'immer';


const numberOfRows = 40;
const numberOfCols = 60; 


function Grid(){
    //initial state for grid
    const [grid, setGrid] = useState(()=>{
        const gridRows = []; //rows set to an empty array

        //for loop where i=0 means cell is dead and i= 1 is alive
        //want to initialize an array of zeros. Have callback function return 0 
        for (let i = 0; i< numberOfRows; i ++){
            gridRows.push(Array.from(Array(numberOfCols), ()=> 0))
        }
        //Array.from method takes in two parameters: 
        //length of the array and a mapping function that returns the value and a key
        return gridRows; 
    })

    // console.log(grid)


    return (
        <div style ={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numberOfCols}, 20px)`        //CSS grid styling 
        }}>     
     {/*map through rows and cols to display grid  */}
        {grid.map((rows, i)=>rows.map((cols, j) =>
            <div 
            onClick ={()=>{
                const newGrid = produce(grid, gridCopy =>{
                    gridCopy [i][j] = 1;
                })
                setGrid(newGrid)   
            }}
            key ={`${i}-${j}`} //unique key defined with index of i(rows) and j (cols) for each individual cell 
            style ={{width: 20,                       
            height: 20, backgroundColor: grid [i][j] ? 'yellow' : undefined, //if alive pink, else undefined
            border: 'solid 1px black' }}>
            </div>))}
        </div>
    )
}

export default Grid; 