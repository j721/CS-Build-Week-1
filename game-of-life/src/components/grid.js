import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const rows = 40;
const cols = 60; 


function Grid(){
    //initial state for grid
    const [grid, setGrid] = useState(()=>{
        const gridRows = []; //rows set to an empty array

        //for loop where i=0 means cell is dead and i= 1 is alive
        //want to initialize an array of zeros. Have callback function return 0 
        for (let i = 0; i< rows; i ++){
            gridRows.push(Array.from(Array(cols), ()=> 0))
        }//Array.from method takes in two parameters. The length of the array and a mapping function that returns the value and a key
        return gridRows; 
    })

    console.log(grid)


    return (
        <></>
    )
}

export default Grid; 