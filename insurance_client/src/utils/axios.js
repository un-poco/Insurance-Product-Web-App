import axios from 'axios';
import { stringify } from 'qs';

// 请求拦截
// axiosService.interceptors.request.use(
//   (config) => {
  
//     // 兼容 post 跨域问题
//     if (config.method === 'post') {
    
//       // 修改 Content-Type
//       config.headers['Content-Type'] =
//         'application/x-www-form-urlencoded';
        
//       // 将对象参数转换为序列化的 URL 形式（key=val&key=val）
//       config.data = stringify(config.data);
//     }
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

axios.defaults.timeout = 1800000;
axios.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded;charset=UTF-8';;
axios.defaults.withCredentials = true;

// 响应拦截器
axios.interceptors.response.use(
    res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
    err => Promise.reject(err)
)
