import React from 'react'

import {deleteFile,deleteFolder} from '../../../utils/FileHandling'

const DeleteNode = ({name,path,isFile,setOverlayType}) => {

  const _onClick = (e) => {
    if(e.target==e.currentTarget){
      setOverlayType(null)
    }
  }
  
  const _onSubmit = () =>{
    if(isFile){
      deleteFile(path)
    }else{
      deleteFolder(path)
    }
    setOverlayType(null)
  }
  
  const _onCancel = () =>{
    setOverlayType(null)
  }

  return (
    <div id="Operation-Overlay" onClick={_onClick}>
      <div className="Overlay-Container" id="Delete">
        <h3>Delete</h3>
        <h4>Note: This action is not reversible <br/> are you sure you want to delete<br/>{name}</h4>
        <div id="Delete-Options">
          <span onClick={_onSubmit}>Delete</span>
          <span onClick={_onCancel}>Cancel</span>
        </div>
      </div>
    </div>
  )
}

export default DeleteNode;
