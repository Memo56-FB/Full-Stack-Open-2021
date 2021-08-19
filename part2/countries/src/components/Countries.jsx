import React from 'react'

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
                        return( 
                            <React.Fragment key={country.name}>
                                <h2>{country.name}</h2>
                                <p>Capital: {country.capital}</p>
                                <p>Population: {country.population}</p>
                                <h3>Languages</h3>
                                {country.languages.map(language => <p key={language.nativeName}>{language.name}</p>)}
                                <img width="200px" src={country.flag} alt={country.name} />
                            </React.Fragment>
                        )
                    }
                return <p key={country.alpha3Code}>{country.name}</p>
                })
            }
            {copyCountries.length === 0 && <p>nothing found...</p>}
        </>
    )
}
