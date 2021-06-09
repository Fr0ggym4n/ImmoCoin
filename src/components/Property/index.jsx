import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop:'2rem',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  
}));

const Property = ({ properties }) => {
  const { idProperty } = useParams();
  const [currentProperty, setCurrentProperty] = useState(null);

  

  useEffect(() => {
    fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`)
      .then((response) => response.json())
      .then((data) => setCurrentProperty(data));
  }, [idProperty]);

  console.log(currentProperty)
  const classes = useStyles();

   
  return <div>
    <Container maxWidth="sm" className={classes.container}>
      {currentProperty && <div>
        <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="picture house"  width="100%"/>
        <h2>{currentProperty.name}</h2>
        <p>{currentProperty.description}</p>
        <span>Price: { currentProperty.price} $</span>
      </div>}
      </Container>
        </div>;
};

export default Property;
      
      
   
 

