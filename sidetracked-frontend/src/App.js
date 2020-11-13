import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/homePage/homePage';

class App extends Component {
  render() {
    return (
      <div className="App">
				<div style={{  height: "100vh", width: "100%", backgroundColor:"#2C2F33"}}>
          <HomePage />
				</div>
      </div>
    );
  }
}

export default App;
