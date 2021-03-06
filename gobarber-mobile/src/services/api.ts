import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.164:3333',
});

export default api;
