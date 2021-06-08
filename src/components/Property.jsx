import React from 'react'

function Property({ property }) {
    console.log(property.name);
    return (
        <div>
            {property.name}
        </div>
    )
}

export default Property

