import axios from 'axios';

const api = axios.create({
    baseURL: 'https://carememo.onrender.com',
    withCredentials: true,
});

export default api;