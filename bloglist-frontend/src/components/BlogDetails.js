import React, { useState } from 'react'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import Header from './Header'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function BlogDetails({ blogs }) {

  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const history = useHistory()

  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch()


  const handleLike = async (blog) => {
    const blogObj = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    }

    dispatch(likeBlog(blogObj, blog.id))
  }

  const handleRemove = async (id) => {
    dispatch(removeBlog(id))
    history.push('/')
  }

  const handleComment = async (e) => {
    e.preventDefault()
    dispatch(commentBlog({comment}, id))
    setComment('')
  }

  return (
    <div>
      <Header />
      <h1>{blog.title}</h1>
      <p>url: <a href={`${blog.url}`}>{blog.url}</a></p>
      <p style={{ display: "inline" }}>{blog.likes} likes</p>
      <button onClick={() => handleLike(blog)}>like</button>
      <p>added by {blog.user.name}</p>
      <h2>comments</h2>

      <form onSubmit={handleComment}>
        <input type="text" value={comment} name="comment" onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {blog.comments.map(c => <li>{c}</li>)}
      </ul>

      {blog.user.id.toString() === loggedUser.id.toString() ? <button onClick={() => handleRemove(blog.id)}>remove</button> : null}
    </div>
  )
}

export default BlogDetails
