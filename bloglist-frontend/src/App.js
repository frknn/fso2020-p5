import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      clearLoginForm()
    } catch (err) {
      clearLoginForm()
      alert('An error occured while logging in!')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObj) => {
    try {
      const blog = await blogService.createBlog(blogObj)
      setBlogs(blogs.concat(blog))

    } catch (error) {
      alert(error)
    }
  }

  const likeBlog = async (blogObj, id) => {
    try {
      const blog = await blogService.updateBlog(blogObj, id)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))
    } catch (error) {
      alert(error)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.removeBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div>
      {user ? <>
        <h1>blogs</h1>
        <p style={{ display: 'inline' }}>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
        <Togglable buttonLabel='add new blog'>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        <hr />
        {blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={likeBlog} deleteBlog={removeBlog} />)}
      </> :
        <LoginForm
          handleLogin={handleLogin}
          usernameValue={username}
          pwValue={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePwChange={({ target }) => setPassword(target.value)}
        />

      }
    </div >
  )
}

export default App