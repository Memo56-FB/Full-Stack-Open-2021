import React, { useState } from 'react'
import CountryInf from './CountryInf'

export default function ShowCountry({country}) {
    const [show,setShow] = useState(false)
    const [text, setText] = useState("Show")
    const handleClickShow = ()=>{
        if(show){
            setShow(false)
            setText("Show")
        }else{
            setShow(true)
            setText("Show Less")
        }
       
    }
    if(show){
        return(
            <>
                <p>{country.name}
                    <button type='button' onClick={handleClickShow}>
                        {text}
                    </button>
                </p>
                <CountryInf country={country}/>
            </>
        )
    }
    return (
        <>
            <p>{country.name}
                <button type='button' onClick={handleClickShow}>
                    {text}
                </button>
            </p>
            
        </>
    )
}
