import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (user) => {
  try {
    const res = await axios.post(baseUrl, user)
    return res.data
  } catch (error) {
    throw new Error('invalid credentials!!!')
  }
}

export default { login }