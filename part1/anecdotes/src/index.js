import './index.css';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const points = new Array(6).fill(0)
  const [vote, setVote] = useState(points)
  const copy = [...vote]
  let maxNumber = Math.max(...vote)
  let popularAnecdote;
  const handleNewAnecdoteClick = ()=>{
    setSelected(Math.floor(Math.random()*(6-0)))
  }
  
  const handleVoteClick = ()=>{
    copy[selected] += 1;
    setVote(copy)
  }
  for(let x = 0; x < vote.length ; x++){
    if(vote[x] === maxNumber){
      popularAnecdote = x
    }
  }
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {vote[selected]} votes</p>
      <button onClick={handleNewAnecdoteClick}>New Anecdote</button>
      <button onClick={handleVoteClick}>Vote</button>
      <h1>Anecdote with most votes</h1>
      {maxNumber <= 0 ? <p>Vote for some anecdote</p> : 
      <>
        <p>{props.anecdotes[popularAnecdote]}</p>
        <p>Has {vote[popularAnecdote]} votes</p>
      </>}
    </>
  )
}


console.log()
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)