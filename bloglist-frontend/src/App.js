import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  const clearBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    e.preventDefault();
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const blogObj = { title, author, url }
      const blog = await blogService.createBlog(blogObj)
      setBlogs(blogs.concat(blog))
      clearBlogForm()

    } catch (error) {
      clearBlogForm()
      alert(error)
    }
  }

  return (
    <div>
      {user ? <>
        <h1>blogs</h1>
        <p style={{ display: "inline" }}>{user.name} logged in</p> <button onClick={handleLogout}>log out</button>
        <BlogForm
          handleSubmit={handleSubmit}
          titleValue={title}
          authorValue={author}
          urlValue={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
        ___________________________________
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
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