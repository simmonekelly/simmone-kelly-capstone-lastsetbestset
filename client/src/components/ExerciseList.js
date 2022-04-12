import React from 'react'

function ExerciseList(props) {
    const { exercises } = props
    //console.log(exercises)
    return (
        <div>
            <h2>{exercises.name}</h2>
        </div>
    )
}

export default ExerciseList
