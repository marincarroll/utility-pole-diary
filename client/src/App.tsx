import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apiCall = () => {
    axios.get('http://localhost:8080/poles').then((response) => {
      //this console.log will be in our frontend console
      console.log(response.data);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;
