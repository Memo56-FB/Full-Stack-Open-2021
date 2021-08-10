import React from 'react'

export default function Total(props) {
    return (
        <p>
            Numbers of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}  
        </p>
    )
}
