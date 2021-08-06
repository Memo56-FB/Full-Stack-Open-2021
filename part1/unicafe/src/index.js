import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />, 
  document.getElementById('root')
)