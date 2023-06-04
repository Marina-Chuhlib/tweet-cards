import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://647874fa362560649a2dceb2.mockapi.io/app',
});

export default instance;
