import React from 'react'

function BlogForm(props) {
  const { handleSubmit, titleValue, authorValue, urlValue, handleTitleChange, handleAuthorChange, handleUrlChange } = props
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input type="text" value={titleValue} name="title" onChange={handleTitleChange} />
        </div>
        <div>
          author: <input type="text" value={authorValue} name="author" onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input type="text" value={urlValue} name="url" onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm