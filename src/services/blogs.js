import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3003'}/api/blogs`

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const like = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}/like`, {}, config)
    return response.data
}

const addComment = async (id, text) => {
    // Comments might be allowed without token? 
    // If we want to support "Anonymous" via token absence or forced flag.
    // My backend logic checks token but falls back to Anonymous.
    // So let's attach token if we have it.
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${baseUrl}/${id}/comments`, { text }, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, create, update, like, addComment, remove, setToken }
