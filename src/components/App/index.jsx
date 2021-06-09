import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Home from 'pages/Home';
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
      .then((data) => setProperties(data));
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Home properties={properties}/>
            </Route>
            <Route path="/properties/:idProperty"  >
                <Property properties={properties}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider >
  );
}

export default App;
