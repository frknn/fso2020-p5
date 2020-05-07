import React, { useState } from 'react'

function BlogForm(props) {
  const { createBlog } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = async (e) => {
    e.preventDefault()
    await createBlog({ title, author, url })
    clearForm()
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm