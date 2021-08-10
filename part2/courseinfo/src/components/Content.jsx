import React from 'react'
import Part from './Part'

export default function Content({courses}) {
    const exercises = courses.parts.map(part => <Part key={part.id} parts={part} />)
    return (
        <>
            {exercises}
        </>
    )
}
