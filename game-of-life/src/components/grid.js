import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const numberOfRows = 40;
const cols = 60; 


function Grid(){
    //initial state for grid
    const [grid, setGrid] = useState(()=>{
        const gridRows = []; //rows set to an empty array

        //for loop where i=0 means cell is dead and i= 1 is alive
        //want to initialize an array of zeros. Have callback function return 0 
        for (let i = 0; i< numberOfRows; i ++){
            gridRows.push(Array.from(Array(cols), ()=> 0))
        }
        //Array.from method takes in two parameters: 
        //length of the array and a mapping function that returns the value and a key
        return gridRows; 
    })

    console.log(grid)


    return (
        <>          
        {grid.map((rows, i)=>rows.map((col, j) =>
            <div 
            key ={`${i}-${j}`} //unique key defined with index of i(rows) and j (col)
            style ={{width: 20,                       
            height: 20, backgroundColor: grid [i][j] ? 'pink' : undefined, //if alive pink, else undefined
            border: 'solid 1px black' }}>

            </div>))}
        </>
    )
}

export default Grid; 