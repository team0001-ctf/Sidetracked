import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Header from '../Header/Header'
import Editor from '../Routes/Editor'
import Authentication from '../Routes/Authentication'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main-container'> 
        <Router>
            <Switch>
              <Route path="/auth">
                <Authentication />
              </Route>
              <Route path="/editor">
                <Editor />
              </Route>
            </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
