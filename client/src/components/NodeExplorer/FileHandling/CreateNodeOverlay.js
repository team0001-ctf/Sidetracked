import React,{useState} from 'react'

import {createFile, createFolder} from '../../../utils/FileHandling'

const CreateNode = ({name,path,isFile,setOverlayType}) => {
  
  var [value, setValue] = useState('');

  const _onClick = (e) => {
    if(e.target===e.currentTarget){
      setOverlayType(null)
    }
  }
  
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  const _handleSubmit = (e) =>{
    e.preventDefault()
    if(value.trim() !== ''){
      if(isFile){
        createFile(path+value)
      }else{
        createFolder(path+value)
      }
      setOverlayType(null)
    }
  }
  return (
    <div className='Overlay' onClick={_onClick}>
      <form className="Overlay-Container" onSubmit={_handleSubmit}>
        <input id="Overlay-Content" type='text' 
          value={value} 
          onChange={onChange} 
          placeholder={isFile ? 'File Name' : 'Folder Name'} 
        />
        <input type='image' src={process.env.PUBLIC_URL+'/check.svg'} alt='ok' />
      </form>
    </div>
  )
}

export default CreateNode
