import React, {useState} from 'react'

import ParentNode from './ParentNode'
import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FolderNode = () => {
  var [collapsed, setCollaped] = useState(true);
  
  const _onToggle = () => {
    setCollaped(!collapsed);
  }
  
  return (
    <div className="node-contianer">
      <div className="node-descripition">
        <span id="Node-Expander"> </span>
        <span id="Node-Name"><b>Directory</b></span>
        <FileHandlingButtons 
          path={'/'}
          isFolder
          isRoot
        />
      </div>
    </div>
  )
}

export default FolderNode
