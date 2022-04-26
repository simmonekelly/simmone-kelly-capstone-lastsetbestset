import React from 'react'

function ExerciseList(props) {
    const { exercises } = props
    return (
        <div>
            <h2>{exercises.name}</h2>
        </div>
    )
}

export default ExerciseList
