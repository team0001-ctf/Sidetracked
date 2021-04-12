import React, {useState} from 'react'

import NodeOperations from './NodeOperations/NodeOperations.js'

const NodeContainer = ({needed}) => {
  var [active, setActive] = useState(false);
  var [operationType, setOperationType] = useState(null);
  
  const _onToggle = () => {
    setActive(!active);
  }
  
  const _doAddFile = () =>{
    setOperationType('AddFile')
  }
  
  const _doAddFolder = () =>{
    setOperationType('AddFolder')
  }
  
  const displayOperation = () => {
    switch(operationType){
      case "AddFile":
        return <NodeOperations 
          operation={operationType}
          setOperationType={setOperationType}
          placeholder="Enter File Name"
        />
        break;
      case "AddFolder":
        return <NodeOperations 
          operation={operationType}
          setOperationType={setOperationType}
          placeholder="Enter Folder Name"
        />
        break;
      default:
          setOperationType(null)
      }
  }

  const displayChildren = () =>{
    if(needed){
      return <NodeContainer />
    }
  }

  return (
    <div id="Node-Handler">
      {operationType ? displayOperation() : null}
      <div id="Node-Options">
        <span id="Node-Expander" onClick={_onToggle}>{ active ? '-' : '>'}</span>
        <span id="Node-Name">Node1</span>
        <div>
          <span id="Add-Node" onClick={_doAddFile}>+</span>
          <img src={process.env.PUBLIC_URL + '/folder.svg'} onClick={_doAddFolder} id="Add-Folder"/>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node"/>
        </div>
      </div>
      <div id='Child-Node'>
        { active ? displayChildren() : null}
      </div>
    </div>
  )
}

export default NodeContainer
