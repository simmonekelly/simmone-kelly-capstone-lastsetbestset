import React from 'react'

function ExerciseSearchResults( props) {
    const { exercise, selectWorkout } = props
    return ( 
        <div className="d-flex m-2 align-items-center" onClick={() => selectWorkout(exercise.id)}>
            <img src={exercise.gifUrl} style={{ height: "64px", width: "64px"}} />
            <div className="ml-3">
                <div>{exercise.name}</div>
                <div className="text-muted">{exercise.target}</div>
            </div>
        </div>
    )
}

export default ExerciseSearchResults
