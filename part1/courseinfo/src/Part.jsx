import React from 'react'

export default function Part(props) {
    return (
        <p>
            {props.parts.name}: {props.parts.exercises}  
        </p>
    )
}
