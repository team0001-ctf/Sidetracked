import React from 'react'

import NodeOperations from './NodeOperations.js'
import NodeDelete from './NodeDelete.js'
import {createFile, createFolder, deleteFile, deleteFolder} from '../../../utils/NodeActions.js'

const displayOperation = (operationType,setOperationType,path,name,nodeUpdate) => {
  switch(operationType){
    case "AddFile":
      return <NodeOperations 
        operation={operationType}
        setOperationType={setOperationType}
        placeholder="Enter File Name"
        path={path}
        action={createFile}
        nodeUpdate={nodeUpdate}
      />
    case "AddFolder":
      return <NodeOperations 
        operation={operationType}
        setOperationType={setOperationType}
        placeholder="Enter Folder Name"
        path={path}
        action={createFolder}
        nodeUpdate={nodeUpdate}
      />
    case "DeleteFile":
      return <NodeDelete 
        setOperationType={setOperationType}
        name={name}
        path={path}
        action={deleteFile}
        nodeUpdate={nodeUpdate}
      />
    case "DeleteFolder":
      return <NodeDelete 
        setOperationType={setOperationType}
        name={name}
        path={path}
        action={deleteFolder}
        nodeUpdate={nodeUpdate}
      />
    default:
      setOperationType(null);
      return null;  
    }
}

export default displayOperation
