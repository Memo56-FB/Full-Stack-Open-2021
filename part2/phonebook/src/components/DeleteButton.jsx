import React from 'react'
import personService from '../services/persons'

export const DeleteButton = ({person,setPersons,persons}) => {


    const handleClick = () =>{
        let result = window.confirm(`Delete ${person.name}?`)
        if(result){
            personService.deletePerson(person.id)
            setPersons(persons.filter(personFilter => {
                if(personFilter.id === person.id){
                    return null
                }
                else{
                    return personFilter
                }
            }))
        }
    } 
    return (
        <button onClick={handleClick}>
            Delete
        </button>
    )
}