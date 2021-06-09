import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Property = ({ properties }) => {
  const { idProperty } = useParams();
  const [currentProperty, setCurrentProperty] = useState(null);

  

  useEffect(() => {
    fetch(`https://immocoin-backend.herokuapp.com/api/properties/${idProperty}`)
      .then((response) => response.json())
      .then((data) => setCurrentProperty(data));
  }, [idProperty]);

 
  return <div>{currentProperty && currentProperty.name}</div>;
};

export default Property;
