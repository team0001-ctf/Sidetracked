import axios from 'axios'

const createFile = (path) =>{
  let data = {
    path:path+'.md',
    data:""
  }
  axios.post('/api/file/',data)
}

const createFolder = (path) =>{
  let data = {
    path:path
  }
  axios.post('/api/folder/',data)
}

const deleteFile = (path) =>{
  axios.delete(`/api/file/?file=${path}`)

}

const deleteFolder = (path) =>{
  axios.delete(`/api/folder/?node=${path.slice(0,-1)}`)
}

export {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder
}
