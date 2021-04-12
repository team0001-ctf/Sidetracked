import React from 'react'
import './NodeExplorer.css'

import NodeHandler from './NodeHandler.js'

const NodeExplorer = () => {
  return (
    <div id="Node-Explorer">
      <div className='Heading'>
        <div className='header'>Directories</div>
        <div className="Vertical-Divider"></div>
      </div>
      <div id="Nodes">
        <NodeHandler needed={true}/>
      </div>
    </div>
  );
}

export default NodeExplorer
