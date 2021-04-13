import React, {useState, useEffect} from 'react'
import axios from 'axios';

import NodeOperations from './NodeOperations/NodeOperations.js'
import NodeDelete from './NodeOperations/NodeDelete.js'
import NodeChild from './NodeChild.js'

import {createFile, createFolder} from './../../utils/NodeActions.js'

const NodeContainer = ({name,path,currentFile,setCurrentFile}) => {
  var [active, setActive] = useState(false);
  var [operationType, setOperationType] = useState(null);
  var [children, setChildren] = useState({})
  
  const _onToggle = () => {
    setActive(!active);
  }
  
  const _doAddFile = () =>{
    setOperationType('AddFile');
  }
  
  const _doAddFolder = () =>{
    setOperationType('AddFolder');
  }

  const _doDelete = () => {
    setOperationType('DeleteFile');
  }
  
  const displayOperation = () => {
    switch(operationType){
      case "AddFile":
        return <NodeOperations 
          operation={operationType}
          setOperationType={setOperationType}
          placeholder="Enter File Name"
          path={path}
          action={createFile}
        />
      case "AddFolder":
        return <NodeOperations 
          operation={operationType}
          setOperationType={setOperationType}
          placeholder="Enter Folder Name"
          path={path}
          action={createFolder}
        />
      case "DeleteFile":
        return <NodeDelete 
          setOperationType={setOperationType}
          name={name}
        />
      default:
          setOperationType(null)
      }
  }

  useEffect(()=>{
    path = (typeof path !== 'undefined') ? path : '/'
    axios.get(`/api/folder/?node=${path}`)
      .then((res)=>{
          const childs = res.data;
          delete childs.node;
          return childs
      })
      .then((child)=>{
        setChildren(child)
      })
  },[active,operationType])

  const displayChildren = () =>{
    return children.dir_children.map((elem)=>
      <NodeContainer 
        name={elem}
        path={path+elem+'/'}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
      />
    ).concat(children.files_children.map((elem)=>
      <NodeChild 
        name={elem}
        path={path+elem}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
      />
    ))
  }

  return (
    <div id="Node-Handler">
      {operationType ? displayOperation() : null}
      <div id="Node-Options">
        <span id="Node-Expander" onClick={_onToggle}>{ active ? '-' : '>'}</span>
        <span id="Node-Name">{name}</span>
        <div>
          <span id="Add-Node" onClick={_doAddFile}>+</span>
          <img src={process.env.PUBLIC_URL + '/folder.svg'} onClick={_doAddFolder} id="Add-Folder"/>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node" onClick={_doDelete}/>
        </div>
      </div>
      <div id='Child-Node'>
        { active ? displayChildren() : null}
      </div>
    </div>
  )
}

export default NodeContainer
