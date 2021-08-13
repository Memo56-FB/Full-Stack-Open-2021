import React from 'react'

export default function Filter({searchName,handleChangeSearch}) {
    return (
        <p>
            Filter Shown With <input type="search" value={searchName} onChange={handleChangeSearch} />
        </p>
    )
}
