import axios from 'axios';
import { DuplicatedCheck, UserSingUp } from './axiosTyping';

export const SERVER_URL = 'http://3.34.95.73:8000/';

export const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

export const apis = {
  signUp: (userSignUp: any) => instance.post('/api/user/signup', userSignUp).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  }),
  duplicatedCheck: (duplicatedCheck: DuplicatedCheck) =>
    instance.post('/api/user/check', duplicatedCheck).then((res) => {
      return res.data;
    }),
};

// instance.interceptors.request.use((req) => {
//   if (req.headers) {
//     req.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
//     req.headers.refreshToken = `${window.localStorage.getItem('refreshToken')}`;
//   }
//   return req;
// });

// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.response.data == 'ExpiredDate') {
//       const result = await instance.put(
//         '/api/refresh',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
//             refreshToken: `${window.localStorage.getItem('refreshToken')}`,
//           },
//         }
//       );
//       window.localStorage.setItem('accessToken', result.data.accessToken);
//       window.localStorage.setItem('refreshToken', result.data.refreshToken);

//       originalRequest.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
