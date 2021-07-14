import React, { useState } from "react"
import './App.css';

import Header from '../Header/Header'
import Editor from '../Routes/Editor'
import Authentication from '../Routes/Authentication'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main-container'> 
        <Authentication/>
      </div>
    </div>
  );
}

export default App;
