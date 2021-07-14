import React from 'react'

import './Authentication.css'

const Login = ({setAnim}) => {
  const _onClick = () =>{
    setAnim('slideleft-anim')
  }

  return (
    <form className="auth-form" action="">
      <h2>Sign In</h2>
      <input id="" type="text" name="" placeholder="Username"/>
      <input id="" type="text" name="" placeholder="Password"/>
      <input type="submit" value="Log In"/>
      <div>Not a member ? <a onClick={_onClick}>Sign Up</a></div>
    </form>
  )
}

export default Login
