import React from 'react'

import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FileNode = ({name,path,currentFile,setCurrentFile}) => {
  
  const _onClick = () => {
    setCurrentFile(path);
  }

  return (
    <div className="node-contianer" onClick={_onClick}>
      { currentFile===path ? <div className='node-selected'></div> : null}
      <div className="node-descripition">
        <div> </div>
        <span className="node-name">{name}</span>
        <FileHandlingButtons 
          name={name}
          path={path}
        />
      </div>
    </div>
  )
}

export default FileNode
