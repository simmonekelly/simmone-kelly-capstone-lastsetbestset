import React from 'react'

function AddedExercise(props) {
    const { addedExercise } = props
    return (
        <div>
            <h3>{addedExercise.name}</h3>
        </div>
    )
}

export default AddedExercise
