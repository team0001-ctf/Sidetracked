import React,{useState} from 'react'

import './NodeExplorer.css'

import ParentNode from './Nodes/ParentNode'

const NodeExplorer = ({currentFile,setCurrentFile}) => {
  var [update, setUpdate] = useState(false)
  const updater = () => {
    console.log("Update")
    setUpdate(!update)
  }
  
  return (
    <div className="node-explorer">
        <ParentNode 
          path='/'
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          update={update}
          updater={updater}
        />
    </div>
  );
}

export default NodeExplorer
