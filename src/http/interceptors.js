import axios from 'axios'
import host from './host.js'

const http = axios.create({
  baseURL: host[process.env.NODE_ENV],
  timeout: 10000,
})

//https://github.com/mzabriskie/axios#interceptor
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})

// TODO 根据返回格式 处理错误
http.interceptors.response.use(function (resp) {

  if (resp.data.result === '桌号不存在') {
    return Promise.reject(resp.data.result)
  }

  return resp
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})

export {
  http
}