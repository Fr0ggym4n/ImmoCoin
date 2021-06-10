import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { authenticate } from 'store/actions'
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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
       
    },
    linkStyle: {
        textDecoration: "none",
        color: 'black'
    }
  }));



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
    const classes = useStyles();
    return (
        <div className={classes.containerProperty}>
            <h2>My Properties</h2>
            <div>
                    {propertiesUser && propertiesUser.map((property, index) => (
                <div key={index}>
                    <Link to={"/properties/" + property.id} className={classes.linkStyle}>
                    <div className={classes.cardProperty}>
                    <h2 className={classes.cardItem}>{property.name}</h2>
                    <p className={classes.cardItem}>{property.description}</p>
                    <p className={classes.cardItem}>{property.price} $</p>
                </div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    )
}


export default MyProperties;