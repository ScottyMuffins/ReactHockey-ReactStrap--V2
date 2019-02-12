import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainForm from './Components/MainForm'
import { Alert } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App-container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>NHL Quick Stats</h1>
          <h2>Using <code>react.js</code>, <code>reactstrap</code> and the NHL <a href='https://statsapi.web.nhl.com/api/v1/teams'><code>statsAPI</code></a></h2>
          <p>
            If you have cloned/downloaded this, view <code>src/App.js</code> to see the top-level <code>react</code> component.
          </p>
        </header>
        <div className='App-main'>
          <main className="container">
            <MainForm/>
          </main>
        </div>
        <footer className="App-footer">
            <Alert color='info'>Currently Under Development</Alert>
        </footer>
      </div>
    );
  }
}

export default App;
