import axios from 'axios'

const url = import.meta.env.VITE_MODE === 'deployment'
    ? "https://ecommerce-backend-blush-nu.vercel.app/api"   
    : "http://localhost:3000/api"                           

const api = axios.create({
    baseURL: url,
    headers: { "Content-Type": 'application/json' },
    withCredentials: true
})

export default api