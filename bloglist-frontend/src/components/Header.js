import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

function Header() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <>
      <div style={{backgroundColor:'lightgray'}}>
        <Link style={{ padding: 5 }} to="/blogs">blogs</Link>
        <Link style={{ padding: 5 }} to="/users">users</Link>
        <p style={{ display: 'inline' }}>{user.name} logged in.</p> <button onClick={() => dispatch(logout())}>log out</button>
      </div>
      <h1>BLOGS APP</h1>
    </>
  )
}

export default Header
