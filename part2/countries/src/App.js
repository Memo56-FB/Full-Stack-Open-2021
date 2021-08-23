import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Countries from './components/Countries';
function App() {
  const [countries,setCountries] = useState([])
  const [search,setSearch] = useState('')
  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error))
  },[])
  return (
    <main>
      <h1>Find Countries <input onChange={handleChangeSearch} value={search} type='search'/> </h1>
      <Countries countries={countries} search={search} />
    </main>
  );
  
}

export default App;
