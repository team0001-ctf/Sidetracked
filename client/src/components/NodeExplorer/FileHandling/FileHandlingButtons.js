import React,{useState} from 'react'

import CreateNodeOverlay from './CreateNodeOverlay'
import DeleteNodeOverlay from './DeleteNodeOverlay'

const FileHandlingButtons = ({name,path,isFolder}) => {
  
  var [overlayType,setOverlayType] = useState(null);
  var [isFile, setIsFile] = useState(false);

  const _doAddFile = () => {
    setOverlayType('create')
    setIsFile(true)
  };

  const _doAddFolder = () => {
    setOverlayType('create')
    setIsFile(false)
  };

  const _doDelete = () => {
    setOverlayType('delete');
    setIsFile(!isFolder);
  };

  const displayOverlay = () => {
    console.log('create')
    if(overlayType === 'create'){
      return <CreateNodeOverlay
        path={path}
        isFile={isFile}
        setOverlayType={setOverlayType}
      />
    }else{
      return <DeleteNodeOverlay
        name={name}
        path={path}
        isFile={isFile}
        setOverlayType={setOverlayType}
      />
    }
  };

  return(
    <div id="File-Handling">
        { isFolder ? <span  onClick={_doAddFile}>+</span> : null}
        { isFolder ? <img src={process.env.PUBLIC_URL + '/folder.svg'} onClick={_doAddFolder} alt='F'/> : null}
        <img src={process.env.PUBLIC_URL + '/dustbin.svg'} alt='D' onClick={_doDelete} />
        {overlayType ? displayOverlay() : null}
    </div>
  )
}

export default FileHandlingButtons
