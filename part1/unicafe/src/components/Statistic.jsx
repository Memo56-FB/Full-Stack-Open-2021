import React from 'react'

export const Statistic = ({text, value}) => {
    return (
        <>
            <tr>
                <td>{text}:</td>
                <td>{value}</td>
            </tr>   
        </>
    )
}
