import React from 'react'

function SetLog(props) {
    const {increaseSetCounter, setNumber} = props
    return (
          <tr>
            <td>
              <p> {setNumber} </p>
            </td>
            <td>
              <input type="text" placeholder="suggested reps"></input>
            </td>
            <td>
              <input type="text" placeholder="suggested weight"></input>
            </td>
            <td>
              <button onClick={(e) => increaseSetCounter(e)}> + </button>
            </td>
          </tr>
    )
}

export default SetLog
