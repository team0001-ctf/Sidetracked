import React from 'react'
import './NodeExplorer.css'

import NodeContainer from './NodeContainer.js'

const NodeExplorer = () => {
  return (
    <div id="Node-Explorer">
      <div className='Heading'>
        <div className='header'>Directories</div>
        <div className="Vertical-Divider"></div>
      </div>
      <div id="Nodes">
        <NodeContainer needed={true}/>
      </div>
    </div>
  );
}

export default NodeExplorer
