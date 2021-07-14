import React from 'react'

const Register = ({setAnim}) => {

  const _onClick = () =>{
    setAnim('slideright-anim')
  }

  return (
    <form className="auth-form" action="">
      <h2>Sign Up</h2>
      <input id="" type="text" name="" placeholder="Username"/>
      <input id="" type="email" name="" placeholder="Email"/>
      <input id="" type="password" name="" placeholder="Password"/>
      <input id="" type="password" name="" placeholder="Confirm Password"/>
      <input type="submit" value="Log In"/>
      <div>Already a member ? <a onClick={_onClick}>Sign In</a></div>
    </form>
  )
}

export default Register
