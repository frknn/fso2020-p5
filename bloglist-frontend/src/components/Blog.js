import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenNotExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

  const likeBlog = async (blog) => {
    const blogObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await updateBlog(blogObj, blog.id)
  }

  const removeBlog = async (id) => {
    await deleteBlog(id)
  }

  const toggleExpanded = () => setExpanded(!expanded)

  return (
    < div style={{ border: 'solid 1px', margin: '3px', padding: '3px' }}>
      <div style={showWhenNotExpanded}>
        {blog.title} - {blog.author} <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenExpanded}>
        {blog.title} - {blog.author} <button onClick={toggleExpanded}>hide</button>
        <p>url: {blog.url}</p>
        <p style={{ display: 'inline' }}>likes: {blog.likes}</p> <button onClick={() => likeBlog(blog)}>like</button>
        <p>user: {blog.user.name}</p>
        {blog.user.id.toString() === loggedUser.id.toString() ? <button onClick={() => removeBlog(blog.id)}>remove</button> : null}
      </div>
    </div >
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
