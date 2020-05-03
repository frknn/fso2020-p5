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
    console.log('TOKEN:', token)
    const res = await axios.post(baseUrl, blog, config)
    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

export default { getAll, setToken, createBlog }