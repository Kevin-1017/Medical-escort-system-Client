import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const request = axios.create({
  //http://wechatopen.mynatapp.cc/v3pz
  baseURL: 'https:/v3pz.itndedu.com/v3pz',
  timeout: 10000,
  headers: { terminal: 'h5' },
})

request.interceptors.request.use((req) => {
  req.headers['h-token'] = localStorage.getItem('token') || ''
  return req
})
request.interceptors.response.use((res) => {
  const { code, data } = res.data
  if (code == 10000) {
    return data
  }
  if (code == -2) {
    localStorage.removeItem('token')
    router.push('/login')
    return Promise.reject('token过期')
  }
  return Promise.reject('code码异常')
})

function servier(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  return request(options)
}

export default servier
