import axios from 'axios';

export const API_URL = "https://api.themoviedb.org/3"
// export const api_key = "674e056a035570de7e7dea12691bb59"
export const api_key = "41b054d2f94f707fa075bc0feb4f6e8a"

const api = axios.create({
  baseURL: API_URL,
  timeout: 35000,
  dataType: 'jsonp',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;