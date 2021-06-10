import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'


const MyProfile = ({ properties }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const [propertiesUser, setPropertiesUser] = useState([])
    const currentUser = useSelector(state => state.authReducer)
    const history = useHistory()
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)

    const updateCurrentUser = async (e) => {
        e.preventDefault()
        const dataUser = {
            user: {
                email: email,
                password: password
            }
        }
        console.log('token', token)

        const response = await fetch(`https://immocoin-backend.herokuapp.com/api/users/${currentUser.id}`,
            {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataUser)
            })

        if (response.status !== 200) {
            alert("Something wrong during update of your profile!")
            return
        }

        const data = await response.json()
        console.log(data)
        currentUser.email = email
        dispatch(authenticate({
            id: currentUser.id,
            email: email,
        }, token))
        history.push('/')
    }

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

    useEffect(() => {
        fetchPropertiesCurrentUser()
    }, [])

    return (
        <div>
            <div>
                <h2>{currentUser.email}</h2>
            </div>

            <div>
                <div>
                    <h3>Edit Profile</h3>
                </div>
                <form>
                    <div>
                        <label type="email" name="email">Email</label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <label type="password" name="password">Password</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit" onClick={updateCurrentUser}>Update</button>
                    </div>
                </form>
            </div>
            <div>My Properties
                    {propertiesUser && propertiesUser.map((property) => (
                <div >
                   
                        <div>{property.name}</div>
                        <div>{property.description}</div>
                        <div>{property.price}</div>
                  
                   
                </div>
            ))}
            </div>
        </div>


    )
}


export default MyProfile
