import axios, { AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { getToken } from '@/util/auth';
const router = useRouter();
const dev = true;
const service = axios.create({
  baseURL: dev ? 'http://www.baidu.com' : 'http://www.baidu.com',
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      token: getToken(),
    };
    return config;
  },
  (err: Error) => {
    console.log('...');
    Promise.reject(err);
  },
);

service.interceptors.response.use((res) => {
  console.log(res, 'wowowowoow');
});

export default service;
