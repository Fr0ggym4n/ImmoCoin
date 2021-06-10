import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formContainer: {
        padding: "10%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
        
    },
    cardProperty: {
        border: "1px solid ",
        margin: "2rem 5rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "3px",
        backgroundColor: "#f2f2f2",
        
        
    },
    cardItem: {
        margin: "1rem"
    },
    containerProperty: {
        textAlign: "center",
       
    }
  }));


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
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="md" className={classes.container} >
            <div>
                <h3>{currentUser.email}</h3>
            </div>

            <div>
                <form className={classes.formContainer}>
                <div>
                    <h3>Edit Profile</h3>
                </div>
                    <div>
                        <label type="email" name="email">Email</label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <label type="password" name="password">Password</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit" onClick={updateCurrentUser}>Update</button>
                    </div>
                </form>
                </div>
                </Container>
            <div className={classes.containerProperty}>
                <h2>My Properties</h2>
                    {propertiesUser && propertiesUser.map((property) => (
                <div className={classes.cardProperty}>
                    <CardMedia
                        component="img"
                        alt="interior house"
                        height="250"
                        image="https://source.unsplash.com/640x427/?house"
                        title="house"
                    />
                    <h2 className={classes.cardItem}>{property.name}</h2>
                    <p className={classes.cardItem}>{property.description}</p>
                    <p className={classes.cardItem}>{property.price} $</p>
                </div>
            ))}
            </div>
        </div>


    )
}


export default MyProfile
