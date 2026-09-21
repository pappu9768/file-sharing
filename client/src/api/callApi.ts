import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000'
})
// axios.interceptors.request.use((config) => {
    
// })

export default api