import React from 'react'
import './NodeHandler.css'
const NodeHandler = ({needed}) => {
  return (
    <div id="Node-Handler">
      <div id="Node-Options">
        <span id="Node-Expander">&gt;</span>
        <span id="Node-Name">Node1</span>
        <div>
          <span id="Add-Node">+</span>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node"/>
        </div>
      </div>
      <div id='Child-Node'>
        {needed ? <NodeHandler /> : null}
      </div>
    </div>
  )
}

export default NodeHandler
