const express = require('express')
const app = express()
const PORT = 3001

let persons = [
    {
        id:1,
        name: "Arto Hellas",
        number: "040-123456"    
    },
    {
        id:2,
        name: "Ada Lovelace",
        number: "39-44-5323523"    
    },
    {
        id:3,
        name: "Dan Abramov",
        number: "12-43-234345"    
    },
    {
        id:4,
        name: "Mary Poppendick",
        number: "30-23-6423122"    
    }
]

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = +request.params.id
    const person = persons.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end() 
    
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = +request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info',(request,response)=>{
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p> ${new Date}</p>
    `)
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})