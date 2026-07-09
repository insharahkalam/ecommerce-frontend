import axios from 'axios'

const url = import.meta.env.VITE_MODE === 'deployment'
    ? " http://localhost:3000/api" : "https://ecommerce-backend-blush-nu.vercel.app/api"

const api = axios.create({
    baseURL: url,
    headers: { "Content-Type": 'application/json' }
})

export default api