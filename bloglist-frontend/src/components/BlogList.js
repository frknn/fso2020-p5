import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

function BlogList() {

  const blogs = useSelector(state => state.blogs)

  const style = {
    padding: 10,
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column'
  }

  return (
    <div style={style}>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default BlogList
