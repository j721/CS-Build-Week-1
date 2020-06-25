import React, {useState} from "react";

const Select = props =>{

 const [freq, setFreq] = useState(1000);


const changeSpeed = e =>{
    e.preventDefault();
    const speed = e.target.value
    setFreq(speed)
}
            

 return(
     <>
     <h3>Select Speed</h3>
     <select name ="speeds" id ="speeds" onChange = {changeSpeed}>
        <option value ="1000">Normal</option>
        <option value = "500">Fast</option>
        <option value ="3000">Slow</option>
     </select>
     </>
 )
}

export default Select; 