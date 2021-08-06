import React from 'react'
import { Statistic } from './Statistic';

export const Statistics = (props) => {
    const {good,neutral,bad,all,average} = props;
    if(all <= 0 ){
        return(
            <>
                <h2>Statistics</h2>
                <p>No Feedback Given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <Statistic text="Good" value={good}/>
                    <Statistic text="Neutral" value={neutral}/>
                    <Statistic text="Bad" value={bad}/>
                    <Statistic text="All" value={all}/>
                    <Statistic text="Average" value={all > 0 && average / all}/>
                    <Statistic text="Positive" value={all > 0 && <>{good / all * 100} %</>}/>  
                </tbody> 
            </table>
        </>
    )
}
