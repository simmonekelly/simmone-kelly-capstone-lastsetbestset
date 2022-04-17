import React from 'react'

function SetLog(props) {
    const {increaseSetCounter, setNumber, decreaseSetCounter} = props
    return (
          <div className="exercise-sets">
              <p> {setNumber} </p>
              <input type="text" form="workout" id={`set-${setNumber}-reps`} placeholder="suggested reps"></input>
              <input type="text"  form="workout" id={`set-${setNumber}-weight`}  placeholder="suggested weight"></input>
              <button onClick={(e) => increaseSetCounter(e)}> + </button>
              <button onClick={(e) => decreaseSetCounter(e)}> - </button>
          </div>
    )
}

export default SetLog
