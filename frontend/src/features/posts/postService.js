import axios from 'axios'

const API_URL = "https://blog-backend-60jy.onrender.com/api/posts/"

// Get user posts
const getPosts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Get user posts
const getAllPosts = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

// Create new post
const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, postData, config)

    return response.data
}

// Edit user posts
// const updatePost = async (postId, postData, token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }

//     const response = await axios.put(API_URL + postId)
// }

// Delete user post
const deletePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + postId, config)

    return response.data
}

const postService = {
    getPosts,
    getAllPosts,
    createPost,
    deletePost,
}

export default postService