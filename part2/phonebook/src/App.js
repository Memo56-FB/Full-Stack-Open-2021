import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChangeName = (e)=>{
    setNewName(e.target.value)
    console.log(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    for (let person of persons){
      if(newName === person.name){
        alert(`${newName} is already added to phonebook`)
        setPersons(persons)
        setNewName('')
        break
      }else{
        const newNameObj = {name: newName}
        setPersons(persons.concat(newNameObj))
        setNewName('')
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} >
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>{
        return <p key={person.name} >{person.name}</p>
      })}
    </div>
  )
}

export default App
