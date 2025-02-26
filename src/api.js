import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
})

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token')
    if (token) {
        api.defaults.headers.authorization = `${token}`
    }

    return config
})

export default api