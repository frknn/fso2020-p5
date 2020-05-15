import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import Header from './Header'

function Users() {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <Header />
      <h1>Users</h1>
      <p><strong>USERS - BLOGS CREATED</strong></p>
      {users
        .map(user =>
          <p key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> - {user.blogs.length}</p>
        )
      }

    </div>
  )
}

export default Users
