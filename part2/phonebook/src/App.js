import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleChangeName = (e)=>{
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e)=>{
    setNewNumber(e.target.value)
  }
  const handleChangeSearch = (e)=>{
    setSearchName(e.target.value)
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
        const newNameObj = {name: newName,number: newNumber}
        setPersons(persons.concat(newNameObj))
        setNewNumber('')
        setNewName('')
      }
    }
  }

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleChangeSearch={handleChangeSearch} />
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} />
    </div>
  )
}

export default App
