import React, {useState, useEffect} from 'react'
import axios from 'axios';

import ParentNode from './ParentNode'
import FileHandlingButtons from '../FileHandling/FileHandlingButtons'

const FolderNode = ({name,path,currentFile,setCurrentFile,update,updater}) => {
  var [collapsed, setCollaped] = useState(true);
  
  const _onToggle = () => {
    setCollaped(!collapsed);
  }
  
  return (
    <div id="Node-Handler">
      <div id="Node-Options">
        <span id="Node-Expander" onClick={_onToggle}>{ !collapsed ? '-' : '>'}</span>
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
