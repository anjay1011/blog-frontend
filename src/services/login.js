import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3003'}/api/login`

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
