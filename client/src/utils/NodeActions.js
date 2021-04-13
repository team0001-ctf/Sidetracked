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

export {
  createFile,
  createFolder
}
