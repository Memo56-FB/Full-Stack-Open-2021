import React from 'react'

export default function Total({parts}) {
    return (
        <p>
            <strong>
                Total of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}  
            </strong>
        </p>
    )
}
