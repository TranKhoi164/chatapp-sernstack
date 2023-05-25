import React, { useContext, useEffect, useState } from 'react'
import '../../style/auth.css'
import { myContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../api/userApi'
import { Link } from 'react-router-dom'

const {REACT_APP_AUTH_SERVICE} = process.env

function Login() {
  const userContext =  useContext(myContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    password: ''
  })

  console.log(userContext.userObj);

  useEffect(() => {
    if (userContext.userObj !== null) {
      navigate('/messages')
    } else navigate('/')
  }, [userContext.userObj])

  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  console.log(user);

  const loginUser = async (e) => {
    try { 
      e.preventDefault()
      const loginRes = await loginApi(user)
      console.log(loginRes);
      alert(loginRes.message)
      userContext.setUserObj(loginRes.user)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div id="container_auth">
      <div id="auth_block">
        <form id="input_form" onSubmit={loginUser}>
          <h2 style={{marginTop: '50px'}}>LOGIN</h2>
          <input type="text" id='name' name='name' onChange={handleChange} placeholder='Username' className='auth_input' />
          <input type="password" id='password' name='password' onChange={handleChange} placeholder='Password' className='auth_input' />
          <button type='submit'>Submit</button>
          <Link to={'/register'}>or Register</Link>
        </form>
      </div>
    </div>
  )
}

export default Login