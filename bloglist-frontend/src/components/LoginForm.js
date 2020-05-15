import React, { useState } from 'react'
//import loginService from '../services/login'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

function LoginForm(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
      // const user = await loginService.login({
      //   username, password
      // })
      // window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      // setUser(user)
      dispatch(login({ username, password }))
      clearLoginForm()
  }

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  //const { handleLogin, usernameValue, pwValue, handleUsernameChange, handlePwChange } = props
  return (
    <div>
      <h1>log in to app</h1>
      <form onSubmit={handleLogin}>
        <div>
          username: <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password: <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LoginForm