import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverAddress} from '../config/serverAddress';
import Toast from 'react-native-toast-message';

const instance = axios.create({
  baseURL: serverAddress,
  timeout: 20000,
  // headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access');
    console.log('token', token);
    const temp = config;
    if (token) {
      temp.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return temp;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => response,
  error => {
    console.log('[ERR from AXIOS]', error.response?.status);
    const originalRequest = error.config;
    if (!error) {
      Toast.show({
        text1: 'Unexpected error, Please try agian',
        type: 'error',
      });
    } else if (error.response === undefined) {
      console.log('no response of err', error);
    } else if (
      error.code === 'ECONNABORTED' ||
      (error.response && error.response.status === 408)
    ) {
      Toast.show({
        text1:
          'Looks like the server is taking to long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while',
        type: 'error',
      });
    } else if (
      error.response.status === 401 &&
      originalRequest.url === `${serverAddress}/api/v1/auth/token`
    ) {
      return Promise.reject(error);
    } else if (
      error.response.status === 400 ||
      error.response.status === 403 ||
      error.response.status === 406 ||
      error.response.status === 401 ||
      error.response.status === 404
    ) {
      if (
        error.response.data.error &&
        Array.isArray(error.response.data.error) &&
        error.response.data.error.length > 0
      ) {
        error.response.data.error.map((item: string) =>
          Toast.show({type: 'error', text1: `${item}`}),
        );
        return Promise.reject(error);
      }
      if (
        typeof error.response.data === 'object' &&
        error.response.data !== null
      ) {
        Object.keys(error.response.data).map(item =>
          Toast.show({
            type: 'error',
            text1: `${error.response.data[item]}: ${item}`,
          }),
        );
        return Promise.reject(error);
      }
      if (typeof error.response.data === 'string') {
        Toast.show({type: 'error', text1: `${error.response.data}`});
      } else {
        Toast.show({type: 'error', text1: 'error in data handling'});
      }
      return Promise.reject(error);
    } else if (error.response.status >= 500) {
      Toast.show({type: 'error', text1: 'Internal Server Error'});
      console.log('error', error.response || error);
    } else if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      return AsyncStorage.getItem('refresh')
        .then(refresh => JSON.parse(refresh || ''))
        .then(refresh =>
          axios
            .post(`${serverAddress}/api/users/token/refresh/`, {
              refresh,
            })
            .then(({data}) => {
              console.log('[data]', data);
              try {
                AsyncStorage.setItem('access', String(data.access_token));
              } catch (err) {
                console.log(err);
              }
              instance.defaults.headers.common.Authorization = `Bearer ${String(
                data.access_token,
              )}`;
              return instance(originalRequest);
            })
            .catch(err => {
              console.log('[err]', err.response.data);
              if (err.response.status === 401) {
                Toast.show({
                  type: 'error',
                  text1: 'Your token is expired, please login again.',
                });
              }
              // AsyncStorage.clear();
              return Promise.reject(error);
            }),
        )
        .catch(() => {
          Toast.show({type: 'error', text1: `${error.response.data}`});
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
);
export default instance;
