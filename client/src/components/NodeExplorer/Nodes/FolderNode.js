import React, {useState} from 'react'

import ParentNode from './ParentNode'
import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FolderNode = ({name,path,currentFile,setCurrentFile,update,updater}) => {
  var [collapsed, setCollaped] = useState(true);
  
  const _onToggle = () => {
    setCollaped(!collapsed);
  }
  
  return (
    <div id="Node-Handler">
      <div id="Node-Options" >
        <span id="Node-Expander" onClick={_onToggle}>{ !collapsed ? '\u25BE' : '\u25B8'}</span>
        <span id="Node-Name">{name}</span>
        <FileHandlingButtons 
          name={name}
          path={path}
          isFolder
        />
      </div>
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
  )
}

export default FolderNode
