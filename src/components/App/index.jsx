import React from 'react'
import { Provider } from 'react-redux'
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
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
        <Navbar />
          <Switch>
          <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/register">
                                <SignUp />
                            </Route>
                            <Route path="/login">
                                <SignIn />
                            </Route>
          </Switch>
        </div>
      </Router>
    </Provider >
  );
}

export default App;
