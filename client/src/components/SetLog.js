import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

function SetLog(props) {
    const {increaseSetCounter, setNumber, decreaseSetCounter, handleRepChange, handleWeightChange, exerciseid} = props
    return (
          <div className="workoutlog_exercise-sets">
              <p> {setNumber} </p>
              <input type="text" form="workout" id={`set-${setNumber}-reps`} placeholder="0" onChange={(e) => handleRepChange(exerciseid, setNumber, e)}></input>
              <input type="text"  form="workout" id={`set-${setNumber}-weight`}  placeholder="0" onChange={(e) => handleWeightChange(exerciseid, setNumber, e)}></input>
              <FaPlus onClick={(e) => increaseSetCounter(e)} />
              <FaMinus onClick={(e) => decreaseSetCounter(e)} />
          </div>
    )
}

export default SetLog
