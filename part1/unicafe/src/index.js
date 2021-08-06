import React, { useState } from 'react'
import ReactDOM from 'react-dom'
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
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Statistics bad={bad} neutral={neutral} average={average} all={all} good={good} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)