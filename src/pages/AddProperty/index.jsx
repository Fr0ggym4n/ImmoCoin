import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import config from 'config'
import { useDispatch } from 'react-redux'
import { authenticate } from 'store/actions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),

            width: '25ch',
        },
    },
    centerItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
}));



const AddProperty = ({ properties }) => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const history = useHistory()
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)

    const dataProperty = {
        property: {
            description: description,
            name: name,
            price: price
        }
    }
    const fetchAddProperty = async (e) => {
        e.preventDefault()


        console.log('token', token)

        const response = await fetch(`https://immocoin-backend.herokuapp.com/api/properties`,
            {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataProperty)
            })

        if (response) {
            history.push('/myProperties')
            return
        }

        const data = await response.json()
        console.log(data)

    }


    const classes = useStyles();
    console.log("token", token);
    console.log("name", name);
    console.log("dataProperty", dataProperty);
    return (
        <Container maxWidth='xl' className={classes.centerItem}>
            <div>
                <h3>Add your property</h3>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField id="standard-basic" label="Name" onChange={(e) => setName(e.target.value)} />
                    <TextField id="standard-basic" label="Description" onChange={(e) => setDescription(e.target.value)} />
                    <TextField id="standard-basic" label="Price" onChange={(e) => setPrice(e.target.value)} />

                    <button type="submit" onClick={fetchAddProperty}>Publish</button>
                </div>
            </form>
        </Container>

    )
}


export default AddProperty;
