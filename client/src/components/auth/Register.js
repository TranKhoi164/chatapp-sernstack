import React, { useContext, useEffect, useState } from 'react'
import '../../style/auth.css'
import { myContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { registerApi } from '../../api/userApi'
import { Link } from 'react-router-dom'

function Register() {
  const userContext =  useContext(myContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    password: '',
    checkPassword: ''
  })

  useEffect(() => {
    if (userContext.userObj !== null) {
      navigate('/messages')
    } else navigate('/register')
  }, [userContext.userObj])

  console.log(userContext.userObj);

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  console.log(user);

  const registerUser = async (e) => {
    try { 
      e.preventDefault()
      if (user.checkPassword !== user.password) {
        alert('Check password fail!')
        return
      }
      const registerRes = await registerApi({name: user.name, password: user.password})
      userContext.setUserObj(registerRes.user)
      alert(registerRes.message)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div id="container_auth">
      <div id="auth_block">
        <form id="input_form" onSubmit={registerUser}>
          <h2 style={{marginTop: '50px'}}>REGISTER</h2>
          <input type="text" id='name' name='name' onChange={handleChange} placeholder='Username' className='auth_input' />
          <input type="password" id='password' name='password' onChange={handleChange} placeholder='Password' className='auth_input' />
          <input type="password" id='checkPassword' name='checkPassword' onChange={handleChange} placeholder='Check password' className='auth_input' />
          <button type='submit'>Submit</button>
          <Link to={'/'}>or Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Register