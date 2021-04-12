import React from 'react'
import './NodeContainer.css'
const NodeContainer = () => {
  return (
    <div id="Node-Handler">
      <div id="Node-Options">
        <span id="Node-Expander">*</span>
        <span id="Node-Name">Node1</span>
        <div>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node"/>
        </div>
      </div>
    </div>
  )
}

export default NodeContainer
