import React from 'react'

function LoginForm(props) {
  const { handleLogin, usernameValue, pwValue, handleUsernameChange, handlePwChange } = props
  return (
    <div>
      <h1>log in to app</h1>
      <form onSubmit={handleLogin}>
        <div>
          username: <input type="text" value={usernameValue} name="username" onChange={handleUsernameChange} />
        </div>
        <div>
          password: <input type="password" value={pwValue} name="password" onChange={handlePwChange} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LoginForm