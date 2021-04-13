import React from 'react'

const NodeDelete = ({setOperationType,name}) => {

  const _onClick = (e) => {
    if(e.target==e.currentTarget){
      setOperationType(null)
    }
  }

  return (
    <div id="Operation-Overlay" onClick={_onClick}>
      <div className="Overlay-Container" id="Delete">
        <h3>Delete</h3>
        <h4>Note: This action is not reversible <br/> are you sure you want to delete<br/>{name}</h4>
        <div id="Delete-Options">
          <span>Delete</span>
          <span>Cancel</span>
        </div>
      </div>
    </div>
  )
}

export default NodeDelete
