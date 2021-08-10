import React from 'react'

export default function Total({parts}) {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises,0)
    return (
        <p>
            <strong>
                Total of exercises: {totalExercises}  
            </strong>
        </p>
    )
}
