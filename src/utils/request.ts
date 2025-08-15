import axios from 'axios'
import router from '@/router'

const request = axios.create({
  // http://wechatopen.mynatapp.cc/v3pz
  //  baseURL: 'https:/v3pz.itndedu.com/v3pz',
  baseURL: '/api',
  timeout: 10000,
  headers: { 'x-frontend-type': 'h5' },
})

request.interceptors.request.use((req) => {
  if (!req.url?.includes('/login')) {
    req.headers['c_token'] = localStorage.getItem('c_token')
  }
  return req
})

request.interceptors.response.use(
  (res) => {
    const { code, data } = res.data
    if (code === 666) {
      return data
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('c_token')
      localStorage.removeItem('userInfo')
      router.push('/login')
      return Promise.reject('token过期')
    }
    console.log(error)
    return Promise.reject(error)
  },
)

function server(options: any) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  return request(options)
}

export default server
