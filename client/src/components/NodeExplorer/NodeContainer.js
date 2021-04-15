import React, {useState, useEffect} from 'react'
import axios from 'axios';

import NodeChild from './NodeChild.js'
import displayOperations from './NodeOperations/DisplayOperations'

const NodeContainer = ({name,path,currentFile,setCurrentFile,update,updater}) => {
  var [active, setActive] = useState(false);
  var [operationType, setOperationType] = useState(null);
  var [children, setChildren] = useState({})
  var [actionPath, setActionPath] = useState('')
  
  const _onToggle = () => {
    setActive(!active);
  }
  
  const _doAddFile = () =>{
    setOperationType('AddFile');
    setActionPath(path)
  }
  
  const _doAddFolder = () =>{
    setOperationType('AddFolder');
    setActionPath(path)
  }

  const _doDelete = () => {
    setOperationType('DeleteFolder');
    setActionPath(path)
  }
  
  useEffect(()=>{
    axios.get(`/api/folder/?node=${(typeof path !== 'undefined') ? path : '/'}`)
      .then((res)=>{
          const childs = res.data;
          delete childs.node;
          return childs
      })
      .then((child)=>{
        setChildren(child)
      })
      .catch(err=>{
                
      })
  },[active,operationType,path,update])

  const displayChildren = () =>{
    return ((typeof(children)==='object') 
    ? children.dir_children.map((elem)=>
      <NodeContainer 
        key={elem}
        name={elem}
        path={path+elem+'/'}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        updater={updater}
      />
    ).concat(children.files_children.map((elem)=>
      <NodeChild
        key={elem}
        name={elem}
        path={path+elem}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        setOperationType={setOperationType}
        setActionPath={setActionPath}
      />
    ))
    :null
    )
  }

  return (
    <div id="Node-Handler">
      {operationType ? displayOperations(operationType,setOperationType,actionPath,name,updater) : null}
      <div id="Node-Options">
        <span id="Node-Expander" onClick={_onToggle}>{ active ? '-' : '>'}</span>
        <span id="Node-Name">{name}</span>
        <div>
          <span id="Add-Node" onClick={_doAddFile}>+</span>
          <img src={process.env.PUBLIC_URL + '/folder.svg'} onClick={_doAddFolder} id="Add-Folder" alt='F'/>
          {(path !== '/') 
            ? <img src={process.env.PUBLIC_URL + '/dustbin.svg'} alt='D' id="Remove-Node" onClick={_doDelete} /> 
            : null 
          }
        </div>
      </div>
      <div id='Child-Node'>
        { active ? displayChildren() : null}
      </div>
    </div>
  )
}

export default NodeContainer
