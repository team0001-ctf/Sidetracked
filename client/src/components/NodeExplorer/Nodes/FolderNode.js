import React, {useState} from 'react'

import ParentNode from './ParentNode'
import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FolderNode = ({name,path,currentFile,setCurrentFile,update,updater}) => {
  var [collapsed, setCollaped] = useState(true);
  
  const _onToggle = () => {
    setCollaped(!collapsed);
  }
  
  return (
    <div className="node-contianer">
      <div className="node-descripition">
        <span id="Node-Expander" onClick={_onToggle}>{ !collapsed ? '\u25BE' : '\u25B8'}</span>
        <span id="Node-Name">{name}</span>
        <FileHandlingButtons 
          name={name}
          path={path}
          isFolder
        />
      </div>
      <div className='child-contianer'>
        { !collapsed
          ? <ParentNode 
            path={path}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            update={update}
            updater={updater}
          />
          : null}
      </div>
    </div>
  )
}

export default FolderNode
