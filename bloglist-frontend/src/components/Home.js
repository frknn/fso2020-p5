import React from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Header from './Header'

function Home() {
  return (
    <div>
      <Header />
      <Notification />
      <Togglable buttonLabel='add new blog'>
        <BlogForm />
      </Togglable>
      <hr />
      <BlogList />
    </div>
  )
}

export default Home
