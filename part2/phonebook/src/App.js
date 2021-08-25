import React, { useEffect, useState } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const updateNumber = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: newNumber}

    personService
      .updatePerson(person.id,changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
    setNewName('')
    setNewNumber('')
  }

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
    let added = false
    let update
    e.preventDefault()
    for (let person of persons){
      if(newName === person.name){
        update = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(update){
          return updateNumber(person.id)
        }else{
          setNewNumber('')
          setNewName('')
          return added = true
        }
      }
    }
    if(added === false){
    const newPersonObj = {name: newName,number: newNumber}
      personService
        .createPerson(newPersonObj)
        .then(response => {
          setPersons(persons.concat(response))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  useEffect(()=>{
    personService
      .getPersons()
      .then(personsReturned => setPersons(personsReturned))
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
      <Persons persons={persons} setPersons={setPersons} searchName={searchName} />
    </div>
  )
}

export default App
