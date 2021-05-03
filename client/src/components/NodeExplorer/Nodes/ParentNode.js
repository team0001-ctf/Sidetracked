import React,{useState,useEffect} from 'react'
import axios from 'axios'

import FileNode from './FileNode'
import FolderNode from './FolderNode'

const ParentNode = ({path,currentFile,setCurrentFile,update,updater}) => {
  var [children, setChildren] = useState({})

  useEffect(()=>{
    axios.get(`/api/folder/?node=${path}`)
      .then((res)=>{
          const childs = res.data;
          delete childs.node;
          return childs
      })
      .then((child)=>{
        setChildren(child)
      })
      .catch(err=>{
                
      })
  },[path,update])

  const displayChildren = () =>{
    if(children.dir_children && children.files_children){
        return children.dir_children.map((elem)=>
          <FolderNode 
            key={elem}
            name={elem}
            path={path+elem+'/'}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            updater={updater}
          />
        ).concat(children.files_children.map((elem)=>
          <FileNode
            key={elem}
            name={elem}
            path={path+elem}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            updater={updater}
          />
        ))
     }else{
        return null;
     }
  }
  return (
  
      <div id='Parent-Node'>
        {displayChildren()}
      </div>
  )
}
export default ParentNode
