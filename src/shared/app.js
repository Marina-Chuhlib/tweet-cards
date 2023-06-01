import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://647874fa362560649a2dceb2.mockapi.io/app',
  params: {
    _limit: 3,
  },
});

// export const getUsers = async () => {
//   const { data: users } = await instance.get('/tweets');
//   return users;
// };

export default instance;
