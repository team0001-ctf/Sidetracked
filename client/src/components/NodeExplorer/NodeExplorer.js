import React,{useState} from 'react'
import './NodeExplorer.css'

import NodeContainer from './NodeContainer.js'

const NodeExplorer = ({currentFile,setCurrentFile}) => {
  var [update, setUpdate] = useState(false)
  const updater = () => {
    console.log("Update")
    setUpdate(!update)
  }
  
  return (
    <div id="Node-Explorer">
      <div className='Heading'>
        <div className='header'>Directories</div>
        <div className="Vertical-Divider"></div>
      </div>
      <div id="Nodes">
        <NodeContainer 
          name="Root"
          path='/'
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          update={update}
          updater={updater}
        />
      </div>
    </div>
  );
}

export default NodeExplorer
