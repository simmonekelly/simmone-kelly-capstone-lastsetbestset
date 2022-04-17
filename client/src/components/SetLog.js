import React from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

function SetLog(props) {
    const {increaseSetCounter, setNumber, decreaseSetCounter} = props
    return (
          <div className="workoutlog_exercise-sets">
              <p> {setNumber} </p>
              <input type="text" form="workout" id={`set-${setNumber}-reps`} placeholder="0"></input>
              <input type="text"  form="workout" id={`set-${setNumber}-weight`}  placeholder="0"></input>
              <FaPlus onClick={(e) => increaseSetCounter(e)} />
              <FaMinus onClick={(e) => decreaseSetCounter(e)} />
          </div>
    )
}

export default SetLog
