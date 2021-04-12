import React, { useState, useCallback } from "react"
import './App.css';
import TextArea from '../TextArea/TextArea.js'
import NodeExplorer from '../NodeExplorer/NodeExplorer.js'

function App() {
  return (
    <div className="App">
      <div className='outer-container'>
        <TextArea />
        <NodeExplorer />
      </div>
    </div>
  );
}

export default App;
