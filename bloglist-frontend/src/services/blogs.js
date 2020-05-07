import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    const res = await axios.post(baseUrl, blog, config)
    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

const updateBlog = async (blog, id) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, blog)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

const removeBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog }