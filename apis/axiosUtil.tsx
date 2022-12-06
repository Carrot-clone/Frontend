import axios from 'axios';
import { DuplicatedCheck } from './axiosTyping';

export const SERVER_URL = 'http://13.124.29.76:8000';

export const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((req) => {
  if (req.headers && localStorage.getItem('accessToken')) {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
    // req.headers.refreshToken = `${window.localStorage.getItem('refreshToken')}`;
    req.headers = {'X-CSRFToken' : '{{csrf_token}}'}
  }
  return req;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data == 'ExpiredDate') {
      const result = await instance.put(
        '/api/user/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
            refreshToken: `${window.localStorage.getItem('refreshToken')}`,
          },
        }
      );
      window.localStorage.setItem('accessToken', result.data.accessToken);
      window.localStorage.setItem('refreshToken', result.data.refreshToken);

      originalRequest.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const apis = {
  signUp: (userSignUp: any) =>
    instance
      .post('/api/user/signup', userSignUp)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      }),
  signIn: (userSignIn: any) =>
    instance
      .post('api/user/login', userSignIn)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      }),
  duplicatedCheck: (duplicatedCheck: DuplicatedCheck) =>
    instance.post('/api/user/check', duplicatedCheck).then((res) => {
      return res.data;
    }),
  fetchMainItemList: (page: number) =>
    instance
      .get(`/api/post/list/?page=${page}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      }),
  postSellingItem: (postRequset: any) =>
    instance.post('/api/post', postRequset).then((res) => {
      return res.data;
    }),
  postDetail: (postId: number) =>
    instance.get(`/api/post/${postId}`).then((res) => {
      return res.data;
    }),
};
