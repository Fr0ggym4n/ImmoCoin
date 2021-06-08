import React, { useEffect, useState } from 'react'
import Property from './Property';

function Home() {

    const [properties, setProperties] = useState([])
    
    const URL = 'https://immocoin-backend.herokuapp.com/api/properties';

    useEffect(() => {
        fetch(URL)
        .then(response => response.json())
        .then(data => setProperties(data))
   },[])
    
    
    console.log(properties)
    

    return (
        <div>
           
            <ul >
                {properties.map((item) => (
                    <Property key={item.id } item={item}/>
                    
                ))}
            </ul>
        </div>
    )
}

export default Home
