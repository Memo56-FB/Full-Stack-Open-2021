import React from 'react'
import personService from '../services/persons'

export const DeleteButton = ({person,setPersons,persons,setMessageErrorAdded}) => {

    const handleClick = () =>{
        let result = window.confirm(`Delete ${person.name}?`)
        if(result){
            personService
                .deletePerson(person.id)
                    .then(setPersons(persons.filter(personFilter => {
                    if(personFilter.id === person.id){
                        return null
                    }
                    else{
                        return personFilter
                    }
                    })))
                        .catch(error => {
                            setMessageErrorAdded(`Information of ${person.name} has already been removed from server`)
                            setTimeout(() => {
                                setMessageErrorAdded(null)
                            }, 5000);
                        })
                    
                    
        
        }
    } 
    return (
        <button onClick={handleClick}>
            Delete
        </button>
    )
}
