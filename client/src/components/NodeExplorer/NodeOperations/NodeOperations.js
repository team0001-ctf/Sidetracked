import React from 'react'
import './NodeOperations.css'

const NodeOperations = ({operation,setOperationType,placeholder}) => {
  const _onClick = (e) => {
    if(e.target==e.currentTarget){
      setOperationType(null)
    }
  }
  return (
    <div id='Operation-Overlay' onClick={_onClick}>
      <div id="Overlay-Container">
        <input id="Overlay-Content" type='text' placeholder={placeholder} />
        <img src={process.env.PUBLIC_URL+'/check.svg'} />
      </div>
    </div>
  )
}

export default NodeOperations
