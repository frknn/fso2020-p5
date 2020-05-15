import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  return (
    <div style={{ border: 'solid 1px', margin: '3px', padding: '3px' }}>
      <p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
