import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [
    function (data, headers) {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        headers['Authorization'] = `Bearer ${access_token}`
      }
      return JSON.stringify(data)
    }
  ]
})

export default instance
