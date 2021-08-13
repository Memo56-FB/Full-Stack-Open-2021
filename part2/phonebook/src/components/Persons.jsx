import React from 'react'

export default function Persons({persons, searchName}) {
    return (
        <>
            {persons.map((person)=>{
                if(searchName !== "" && person.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) === -1){
                return null
                }
                return <p key={person.name} >{person.name}: {person.phone} </p>
            })}   
        </>
    )
}
