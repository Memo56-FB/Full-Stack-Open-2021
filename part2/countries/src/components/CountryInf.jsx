import React from 'react'

export default function CountryInf({country}) {
    return (
        <React.Fragment>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            {country.languages.map(language => <p key={language.nativeName}>{language.name}</p>)}
            <img width="200px" src={country.flag} alt={country.name} />
        </React.Fragment>
    )
}
