import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import config from 'config'
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  container: {
    marginTop: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

  },

  paper: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: "80%",
    height: "90%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  cardContainer: {
    textalign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  formContainer: {
    padding: "8%",
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize:"2rem"
  },
  inputNumber: {
    padding: "1rem",
    fontSize:"1rem"
  }

}));

const Property = ({ properties }) => {
  const { idProperty } = useParams();
  const [currentProperty, setCurrentProperty] = useState(null);
  const token = Cookies.get(config.COOKIE_STORAGE_KEY)
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const history = useHistory()
  const currentUser = useSelector((state) => state.authReducer);
  const dataProperty = {
    property: {
      description: description,
      name: name,
      price: price
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const fetchEditProperty = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`,
      {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProperty)
      })

    if (response) {
      history.push('/')
      return
    }

    const data = await response.json()
    console.log('data', data)
  }
  const fetchDeleteProperty = async () => {
    const response = await fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    history.push('/')
  }


  useEffect(() => {
    fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`)
      .then((response) => response.json())
      .then((data) => setCurrentProperty(data));
  }, [idProperty]);

  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <div className={classes.label}>
        <h3>Edit property</h3>
      </div>
      <form className={classes.formContainer}>
        <div className={classes.formGroup}>
          <label className={classes.label} type="text" name="username">Name</label>
          <input type="text" className={classes.inputNumber} name="name" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} type="text" name="description">Description</label>
          <textarea rows='4' className={classes.inputNumber} type="text" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className={classes.formGroup}>
          <label  className={classes.label} type="text" name="username">Price</label>
          <input type="number" name="username"  className={classes.inputNumber} onChange={(e) => setPrice(e.target.value)}></input>
        </div>
        <div className={classes.formGroup}>
          <button type="submit" onClick={fetchEditProperty}>Update</button>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Container maxWidth="sm" className={classes.container}>
        {currentProperty && (
          <div className={classes.cardContainer}>
            <img
              src="https://source.unsplash.com/1600x900/?house"
              alt="picture house"
              width="100%"
            />
            <h2>{currentProperty.name}</h2>
            <p>{currentProperty.description}</p>
            <span>Price: {currentProperty.price} $</span>
            <h3>
              Contacter le propriétaire:{" "}
              <span>
                {currentUser.id ? (
                  <a href="#">{currentProperty.user.email}</a>
                ) : (
                    <Link to="/register">Sign up</Link>
                  )}
              </span>{" "}
              {(currentUser.id == currentProperty.user.id) &&
                <div>
                  <div>
                    <button type="button" onClick={handleOpen}>
                      Edit
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}>
                      {body}
                    </Modal>
                  </div>
                  <button onClick={fetchDeleteProperty}>Delete</button>
                </div>}
            </h3>
          </div>
        )}
      </Container>
    </div>
  );

};

export default Property;
