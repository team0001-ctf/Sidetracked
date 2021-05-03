import React from 'react'

import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FileNode = ({name,path,currentFile,setCurrentFile}) => {
  
  const _onClick = () => {
    setCurrentFile(path);
  }

  return (
    <div id="Node-Handler" onClick={_onClick}>
      <div id="Node-Options">
        <span id="Node-Expander">*</span>
        <span id="Node-Name">{name}</span>
        <FileHandlingButtons 
          name={name}
          path={path}
        />  
      </div>
    </div>
  )
}

export default FileNode
