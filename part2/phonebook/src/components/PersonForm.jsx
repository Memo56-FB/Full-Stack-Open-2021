import React from 'react'

export default function PersonForm({handleSubmit,newName,handleChangeName,newNumber,handleChangeNumber}) {
    return (
        <form onSubmit={handleSubmit} >
            <div>
                name: <input required value={newName} onChange={handleChangeName}/>
            </div>
            <div>
                number: <input required type="tel" value={newNumber} onChange={handleChangeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
