import React,{useState} from 'react'
import './NodeOperations.css'

const NodeOperations = ({operation,setOperationType,placeholder,path,action}) => {
  
  var [value, setValue] = useState('');

  const _onClick = (e) => {
    if(e.target==e.currentTarget){
      setOperationType(null)
    }
  }
  
  const onChange = (e) =>{
    setValue(e.target.value)
  }

  const _handleSubmit = (e) =>{
    e.preventDefault()
    action(path+value)
    setOperationType(null)
  }
  return (
    <div id='Operation-Overlay' onClick={_onClick}>
      <form className="Overlay-Container" onSubmit={_handleSubmit}>
        <input id="Overlay-Content" type='text' 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
        />
        <input type='image' src={process.env.PUBLIC_URL+'/check.svg'} />
      </form>
    </div>
  )
}

export default NodeOperations
