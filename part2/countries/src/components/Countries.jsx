import React from 'react'
import CountryInf from './CountryInf'
import ShowCountry from './ShowCountry'

export default function Countries({countries,search}) {
    const copyCountries = countries.filter(country => {
        if(search !== '' && country.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase())=== -1){
            return null
        }
        return country
    })

    if(search === ''){
        return(
            <> </>
        )
    }
    return (
        <>
            {copyCountries.length >= 10 
                ? <p>Too many matches, specify another filter</p>
                : copyCountries.map(country => {
                    if(copyCountries.length === 1){
                        return <CountryInf key={country.name} country={country} />
                    }
                return<ShowCountry key={country.name} country={country} />
                })
            }
            {copyCountries.length === 0 && <p>nothing found...</p>}
        </>
    )
}
