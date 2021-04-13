import React from 'react'

const NodeContainer = ({name,path,currentFile,setCurrentFile}) => {
  const _onClick = () => {
    setCurrentFile(path);
    console.log(path)
  }

  return (
    <div id="Node-Handler" onClick={_onClick}>
      <div id="Node-Options">
        <span id="Node-Expander">*</span>
        <span id="Node-Name">{name}</span>
        <div>
          <img src={process.env.PUBLIC_URL + '/dustbin.svg'} id="Remove-Node"/>
        </div>
      </div>
    </div>
  )
}

export default NodeContainer
