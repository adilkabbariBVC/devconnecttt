
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.73:3333', // replace with your IP address
});

export default api;
