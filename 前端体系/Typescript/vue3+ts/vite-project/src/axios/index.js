import axios from 'axios';
import { useRouter } from 'vue-router';
import { getToken } from '@/util/auth';
const router = useRouter();
const dev = true;
const service = axios.create({
  baseURL: dev ? 'http://www.baidu.com' : 'http://www.baidu.com',
});
var x = 1;
service.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      token: getToken(),
    };
    return config;
  },
  (err) => {
    console.log('...');
    Promise.reject(err);
  },
);
service.interceptors.response.use((res) => {
  console.log(res, 'wowowowoow');
});
export default service;
//# sourceMappingURL=index.js.map
