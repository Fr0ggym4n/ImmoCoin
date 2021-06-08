import React from 'react'

const Property = ({ property }) => {
    console.log(property.name);
    return (
        <div>
            {property.name}
        </div>
    )
}

export default Property

