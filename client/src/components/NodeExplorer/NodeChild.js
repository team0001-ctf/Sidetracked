import React,{useEffect} from 'react'

const NodeChild = ({name,path,currentFile,setCurrentFile,setOperationType,setActionPath}) => {
  
  const _onClick = () => {
    setCurrentFile(path);
  }
  
  const  _doDelete = () => {
    setActionPath(path);
    setOperationType('DeleteFile');
  }

  return (
    <div id="Node-Handler" onClick={_onClick}>
      <div id="Node-Options">
        <span id="Node-Expander">*</span>
        <span id="Node-Name">{name}</span>
        <div>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node" alt='D' onClick={_doDelete}/>
        </div>
      </div>
    </div>
  )
}

export default NodeChild
