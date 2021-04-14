import React from 'react'

const NodeDelete = ({setOperationType,name,path,action,nodeUpdate}) => {

  const _onClick = (e) => {
    if(e.target==e.currentTarget){
      setOperationType(null)
    }
  }
  
  const _onSubmit = () =>{
    action(path,nodeUpdate)
    setOperationType(null)
  }
  
  const _onCancel = () =>{
    setOperationType(null)
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

export default NodeDelete
