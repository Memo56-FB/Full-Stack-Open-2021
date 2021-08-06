import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from './components/Button'
import { Statistics } from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const handleGoodClick = ()=>{
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }
  const handleNeutralClick = ()=>{
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = ()=>{
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2> 
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>
      <Statistics bad={bad} neutral={neutral} average={average} all={all} good={good} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)