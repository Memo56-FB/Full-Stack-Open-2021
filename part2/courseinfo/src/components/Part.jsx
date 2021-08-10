import React from 'react'

export default function Part({parts}) {
    return (
        <p>
            {parts.name}: {parts.exercises}  
        </p>
    )
}
