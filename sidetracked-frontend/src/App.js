import React, { Component } from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';
import NotesPage from './components/Notes/notes';
import markdownEditor from './components/editors/markdown/markdown';
import {
  HashRouter,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact     component={ HomePage } />
          <Route path="/notespage"  component={ NotesPage } />
          <Route path="/editors/markdown"  component={ markdownEditor } />
        </div>
      </HashRouter>
    );   
  }
}

export default App;
