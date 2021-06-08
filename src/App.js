import logo from './logo.svg';
import './App.css';

const App = () => {

  const URL = 'https://immocoin-backend.herokuapp.com/api/properties';


  fetch(URL, {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  })
  .then((response) => response.json())
  .then((data) => {console.log(data);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
