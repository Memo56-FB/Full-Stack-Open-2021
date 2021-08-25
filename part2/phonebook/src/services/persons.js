import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = personObj => {
    const request = axios.post(baseUrl,personObj)
    return request.then(response => response.data)
} 

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personService = {getPersons, createPerson, deletePerson}
export default personService