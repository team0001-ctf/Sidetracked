import React, { useState } from "react"
import './App.css';
import TextArea from '../TextArea/TextArea.js'
import NodeExplorer from '../NodeExplorer/NodeExplorer.js'

function App() {
  var [currentFile, setCurrentFile] = useState('')
  return (
    <div className="App">
      <div className='outer-container'>
        <TextArea
          currentFile={currentFile}
        />
        <NodeExplorer 
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
        />
      </div>
    </div>
  );
}

export default App;
