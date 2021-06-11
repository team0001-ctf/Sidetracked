import React,{useState} from 'react'

import CreateNodeOverlay from './CreateNodeOverlay'
import DeleteNodeOverlay from './DeleteNodeOverlay'

import './FileHandlingButtons.css'

const FileHandlingButtons = ({name,path,isFolder,isRoot}) => {
  
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
    <div className="file-handling">
        { isFolder ? <span  className='file-handling-button' onClick={_doAddFile}>+</span> : null}
        { isFolder ? <img className='file-handling-button' src={process.env.PUBLIC_URL + '/folder.svg'} onClick={_doAddFolder} alt='F'/> : null}
        { !isRoot ? <img className='file-handling-button' src={process.env.PUBLIC_URL + '/dustbin.svg'} alt='D' onClick={_doDelete} /> : null }
        {overlayType ? displayOverlay() : null}
    </div>
  )
}

export default FileHandlingButtons
