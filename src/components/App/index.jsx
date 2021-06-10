import React, { useEffect, useState } from 'react'
import './app.css'
import { Provider } from 'react-redux'
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import MyProfile from 'pages/MyProfile'
import PrivateRoute from 'components/PrivateRoute'
import store from 'store'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Property from 'components/Property';



const App = () => {


  const [properties, setProperties] = useState([]);

  const URL = "https://immocoin-backend.herokuapp.com/api/properties";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data)
        console.log(data)
      });
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home properties={properties} />
            </Route>
            <Route path="/register">
              <SignUp />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/properties/:idProperty" exact >
              <Property properties={properties} />
            </Route>
            <PrivateRoute path="/profile" component={MyProfile} />
          </Switch>
        </div>
      </Router>
    </Provider >
  );
}

export default App;
