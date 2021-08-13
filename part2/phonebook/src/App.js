import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeName = (e)=>{
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e)=>{
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    for (let person of persons){
      if(newName === person.name){
        alert(`${newName} is already added to phonebook`)
        setPersons(persons)
        setNewNumber('')
        setNewName('')
        break
      }else{
        const newNameObj = {name: newName,phone: newNumber}
        setPersons(persons.concat(newNameObj))
        setNewNumber('')
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
          number: <input type="tel" value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>{
        return <p key={person.name} >{person.name}: {person.phone} </p>
      })}
    </div>
  )
}

export default App
