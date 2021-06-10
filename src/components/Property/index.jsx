import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  cardContainer: {
    textalign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"column"
  }
}));

const Property = ({ properties }) => {
  const { idProperty } = useParams();
  const [currentProperty, setCurrentProperty] = useState(null);
  const currentUser = useSelector((state) => state.authReducer);

  console.log(currentUser.email);
  useEffect(() => {
    fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`)
      .then((response) => response.json())
      .then((data) => setCurrentProperty(data));
  }, [idProperty]);

  const classes = useStyles();

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
            </h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Property;
