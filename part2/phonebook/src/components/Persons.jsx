import React from 'react'
import { DeleteButton } from './DeleteButton'

export default function Persons({persons, searchName,setPersons}) { 
    
    return (
        <>
           {persons.map((person)=>{
                if(searchName !== "" && person.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) === -1){
                    return null
                }
            return <p key={person.id} >{person.name}: {person.number} <DeleteButton persons={persons} person={person} setPersons={setPersons}/></p>
            })}
        </>
    )
}