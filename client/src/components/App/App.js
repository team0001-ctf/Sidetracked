import React, { useState } from "react"
import './App.css';
import TextArea from '../TextArea/TextArea.js'
import NodeExplorer from '../NodeExplorer/NodeExplorer.js'

import Header from '../Header/Header'

function App() {
  var [currentFile, setCurrentFile] = useState('')
  return (
    <div className="App">
    <Header/>
    <div className='main-container'> 
    <NodeExplorer 
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
      />
      <TextArea
        currentFile={currentFile}
      />
    </div>
    </div>
  );
}

export default App;
