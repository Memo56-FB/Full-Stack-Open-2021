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
  const [messageAdded, setMessageAdded] = useState(null)
  const [messageNumber, setMessageNumber] = useState(null)
  const [messageErrorAdded, setMessageErrorAdded] = useState(null)

  const updateNumber = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: newNumber}

    personService
      .updatePerson(person.id,changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessageNumber(`Number of ${returnedPerson.name} was changed to: ${returnedPerson.number}`)
        setTimeout(()=>{
          setMessageNumber(null)
        },5000)
    })
    
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
          setMessageAdded(`${response.name} was added`)
          setTimeout(()=>{
            setMessageAdded(null)
          },5000)
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
        {messageAdded && <h2 className="successful-message">{messageAdded}</h2>}
        {messageNumber && <h2 className="successful-message">{messageNumber}</h2>}
        {messageErrorAdded && <h2 className="error-message">{messageErrorAdded}</h2>}
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} setMessageErrorAdded={setMessageErrorAdded} searchName={searchName} />
    </div>
  )
}

export default App
