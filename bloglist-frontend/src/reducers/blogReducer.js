import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      const likedBlog = action.data
      return state.map(b => b.id === likedBlog.id ? likedBlog : b)
    case 'ADD_COMMENT':
      const commentedBlog = action.data
      return state.map(b => b.id === commentedBlog.id ? commentedBlog : b)
    case 'REMOVE_BLOG':
      const removedBlogId = action.data
      return state.filter(b => b.id !== removedBlogId)
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blog)
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog
      })
      dispatch(setNotification(`You created ${newBlog.title}`, 3))
    } catch (err) {
      alert(err)
    }
  }
}

export const likeBlog = (blog, id) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.updateBlog(blog, id)
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
      dispatch(setNotification(`You liked ${likedBlog.title}`, 3))
    } catch (error) {
      alert(error)
    }
  }
}

export const commentBlog = (comment, id) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(comment, id)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(setNotification(`Blog removed!`, 3))
    } catch (error) {
      alert(error)
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer