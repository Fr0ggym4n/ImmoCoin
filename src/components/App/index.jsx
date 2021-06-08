import React from 'react'
import { Provider } from 'react-redux'
import Home from 'pages/Home';
import store from 'store'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';



const App = () => {


  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider >
  );
}

export default App;
