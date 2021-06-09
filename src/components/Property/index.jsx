import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';



const Property = ({ properties }) => {

    const { idProperty } = useParams();
    const [currentProperty, setCurrentProperty] = useState(null)
   

    useEffect(() => {
        const foundProperty = properties.find((element) => element.id == idProperty);
        setCurrentProperty(foundProperty);
        console.log(foundProperty);
      }, [idProperty])

    return (
        <div>
            {currentProperty.name}
        </div>
    )
}

export default Property

