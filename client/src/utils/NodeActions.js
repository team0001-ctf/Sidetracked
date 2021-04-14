import axios from 'axios'
const createFile = (path,nodeUpdate) =>{
  let data = {
    path:path+'.md',
    data:""
  }
  axios.post('/api/file/',data)
}

const createFolder = (path,nodeUpdate) =>{
  let data = {
    path:path
  }
  axios.post('/api/folder/',data)
}

const deleteFile = (path,nodeUpdate) =>{
  axios.delete(`/api/file/?file=${path}`)

}

const deleteFolder = (path,nodeUpdate) =>{
  axios.delete(`/api/folder/?node=${path.slice(0,-1)}`)
    .then((res)=>{
        console.log(res.status)
        if(res.status==200){
            nodeUpdate()
        }
    })
}

export {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder
}
