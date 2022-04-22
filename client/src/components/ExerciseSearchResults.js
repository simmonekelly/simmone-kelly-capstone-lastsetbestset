import React from 'react'

function ExerciseSearchResults( props) {
    const { exercise, selectWorkout } = props
    return ( 
        <div className="workoutlog_exercise-search-results" onClick={() => selectWorkout(exercise.id)}>
            <img src={exercise.gifUrl} />
            <div className="ml-3">
                <p>{exercise.name}</p>
            </div>
        </div>
    )
}

export default ExerciseSearchResults
