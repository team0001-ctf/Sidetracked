import React,{useState} from 'react'
import Login from './Login'
import Register from './Register'

const Authentication = () => {

  var [anim,setAnim] = useState('')
  
  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <div className={anim}>
          <Login setAnim={setAnim}/>  
          <Register setAnim={setAnim}/>  
        </div>
      </div>
    </div>
  )
}

export default Authentication

