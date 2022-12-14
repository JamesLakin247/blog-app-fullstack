import axios from 'axios'

const API_URL = "https://blog-backend-60jy.onrender.com/api/users/" // base url e.g https://post-setter-backend.onrender.com/api/users/

// register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    // const response = await axios.post(API_URL + 'login', userData)
    const response = await axios.post(`${API_URL}login/`, userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout, 
    login,
}

export default authService