import React from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

function User({ users }) {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  return (
    <div>
      <Header/>
      <h1>{user.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(blog => <li>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
