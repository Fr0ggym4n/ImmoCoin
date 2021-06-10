import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { authenticate } from 'store/actions'



const MyProperties = () => {

    const [propertiesUser, setPropertiesUser] = useState([])
    const currentUser = useSelector(state => state.authReducer)
    const history = useHistory()

    const fetchPropertiesCurrentUser = async () => {
        const response = await fetch(`https://immocoin-backend.herokuapp.com/api/properties`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        const properties = await resp.filter((property) => property.user_id == currentUser.id)
        setPropertiesUser(properties)
    }
    console.log('myProporties', propertiesUser)

    useEffect(() => {
        fetchPropertiesCurrentUser()
    }, [])

    return (
        <div>
            <div>My Properties
                    {propertiesUser && propertiesUser.map((property, index) => (
                <div key={index}>
                    <Link to={"/properties/" + property.id}>
                        <div>{property.name}</div>
                        <div>{property.description}</div>
                        <div>{property.price}</div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    )
}


export default MyProperties;