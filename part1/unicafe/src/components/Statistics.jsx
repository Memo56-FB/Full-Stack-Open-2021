import React from 'react'

export const Statistics = (props) => {
    const {good,neutral,bad,all,average} = props;
    if(all <= 0 ){
        return(
            <>
                <h2>Statistics</h2>
                <p>No Feedback Given </p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {all}</p>
            <p>Average: {all > 0 && average / all}</p>
            <p>Positive: {all > 0 && <span>{good / all * 100} %</span>}</p>   
        </>
    )
}
