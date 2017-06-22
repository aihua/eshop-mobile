import axios from 'axios'
import host from './domain.js'

//https://github.com/mzabriskie/axios#interceptor
axios.interceptors.request.use(function (config) {
  config.url = host[process.env.NODE_ENV] + config.url
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})

// TODO 根据返回格式 处理错误
axios.interceptors.response.use(function (resp) {
  console.log(resp)

  if (resp.data.result === '桌号不存在') {
    return Promise.reject(resp.data.result)
  }

  return resp
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})