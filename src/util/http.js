import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://m.maoyan.com',
  timeout: 10000
})

export default instance
